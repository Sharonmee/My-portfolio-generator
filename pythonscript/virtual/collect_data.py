import json
import boto3
from github import Github, Auth
import os
from datetime import datetime

def lambda_handler(event, context):
    try:
        # Get username from the event
        body = json.loads(event.get('body', '{}'))
        username = body.get('username')
        
        if not username:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'Username is required'})
            }

        # Initialize GitHub client
        auth = Auth.Token(os.environ['GITHUB_TOKEN'])
        g = Github(auth=auth)

        # Get user details
        user = g.get_user(username)
        
        # Collect user data
        user_data = {
            'Username': username,
            'Name': user.name,
            'Email': user.email,
            'Bio': user.bio,
            'URL': user.html_url,
            'Location': user.location,
            'PublicRepos': user.public_repos,
            'Followers': user.followers,
            'Following': user.following,
            'AvatarUrl': user.avatar_url,
            'YearsOfExperience': datetime.now().year - user.created_at.year
        }

        # Get repository languages
        languages = {}
        for repo in user.get_repos():
            if repo.language:
                languages[repo.language] = languages.get(repo.language, 0) + 1

        # Sort languages by frequency
        sorted_languages = sorted(languages.items(), key=lambda x: x[1], reverse=True)
        user_data['Languages'] = [{"name": lang, "count": count} for lang, count in sorted_languages[:5]]

        # Get pinned repositories
        projects = []
        query = f"""
        query {{
          user(login: "{username}") {{
            pinnedItems(first: 6, types: REPOSITORY) {{
              nodes {{
                ... on Repository {{
                  name
                  description
                  url
                  primaryLanguage {{
                    name
                  }}
                }}
              }}
            }}
          }}
        }}
        """
        
        headers = {"Authorization": f"bearer {os.environ['GITHUB_TOKEN']}"}
        import requests
        response = requests.post(
            'https://api.github.com/graphql',
            json={'query': query},
            headers=headers
        )
        
        if response.status_code == 200:
            data = response.json()
            pinned_repos = data.get("data", {}).get("user", {}).get("pinnedItems", {}).get("nodes", [])
            
            for repo in pinned_repos:
                projects.append({
                    "RepoName": repo['name'],
                    "URL": repo['url'],
                    "Language": repo['primaryLanguage']['name'] if repo['primaryLanguage'] else "Not specified",
                    "Description": repo['description'] if repo['description'] else "No description available"
                })
        
        user_data['Projects'] = projects

        # Generate professional summary using Bedrock
        bedrock = boto3.client(
            service_name='bedrock-runtime',
            region_name="us-east-1"
        )

        about_prompt = f"""
        Help me write a beautiful and professional summary to include in my resume about myself.
        Make it very natural and start at once without any preamble about this being the output.
        Highlight my key skills, purpose, technologies used, and a few projects I have worked on.
        Pick projects from the list related to my profession.

        Here are some project highlights:
        {json.dumps(projects, indent=2)}

        Please ensure the summary is concise (around 100 - 150 words), professional, and suitable for a technical audience.
        """

        input_data = {
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 1000,
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": about_prompt
                        }
                    ]
                }
            ]
        }

        kwargs = {
            "modelId": "anthropic.claude-3-haiku-20240307-v1:0",
            "contentType": "application/json",
            "accept": "application/json",
            "body": json.dumps(input_data).encode('utf-8')
        }

        response = bedrock.invoke_model(**kwargs)
        response_body = json.loads(response.get('body').read())
        completion = response_body.get('content')
        user_data['About'] = completion[0]['text']

        # Save to DynamoDB
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('Portfolio_Data')
        table.put_item(Item=user_data)
        print(user_data)

        # Save projects separately
        projects_table = dynamodb.Table('portfolio_projects')
        projects_table.put_item(
            Item={
                'username': username,
                'Projects': [{'id': i, 'project': project} for i, project in enumerate(projects)]
            }
        )

        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'Portfolio data collected successfully',
                'username': username
            })
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({
                'error': str(e)
            })
        } 
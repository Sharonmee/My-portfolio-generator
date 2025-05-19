from github import Github, Auth
import os
from dotenv import load_dotenv
import boto3
import json

# Load environment variables
load_dotenv()

# Github authentication
auth = Auth.Token(os.getenv('Github_token'))
g = Github(auth=auth)

# DynamoDB setup
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Portfolio_Data')

# Bedrock client setup
bedrock = boto3.client(
    service_name='bedrock-runtime',
    region_name="us-east-1"
)

# Target GitHub username
username = "kwabenadarkwa"

# Get user details
user = g.get_user(username)
name = user.name
email = user.email
bio = user.bio
url = user.html_url
location = user.location
# List to store project summaries
projects = []

def get_pinned_repositories(username, token):
    g = Github(token)
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
    headers = {"Authorization": f"bearer {token}"}
    import requests
    response = requests.post(
        'https://api.github.com/graphql',
        json={'query': query},
        headers=headers
    )
    
    if response.status_code != 200:
        raise Exception(f"Query failed with status code {response.status_code}: {response.text}")
    
    data = response.json()
    return data.get("data", {}).get("user", {}).get("pinnedItems", {}).get("nodes", [])

# Get pinned repositories
pinned_repos = get_pinned_repositories(username, auth.token)
for repo in pinned_repos:
    repo_name = repo['name']
    repo_description = repo['description'] if repo['description'] else "No description available"
    repo_url = repo['url']
    repo_language = repo['primaryLanguage']['name'] if repo['primaryLanguage'] else "Not specified"

    # Add project details to list
    projects.append({
        "RepoName": repo_name,
        "URL": repo_url,
        "Language": repo_language,
        "Description": repo_description,
    })

# Generate the 'About' professional summary
about_prompt = f"""
Help me write a beautiful and professional summary to include in my resume about myself.
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
about = completion[0]['text']

# Calculate years of experience based on account creation
created_at = user.created_at
from datetime import datetime
current_year = datetime.now().year
years_of_experience = current_year - created_at.year

# Save to DynamoDB
table.put_item(
    Item={
        'Username': username,
        'Name': name,
        'Email': email,
        'About': about,
        'YearsOfExperience': years_of_experience,
        'Projects': projects,
        'URL': url,
        'Location': location
    }
)

print("Successfully uploaded user portfolio to DynamoDB ✅")


print("Successfully uploaded projects to DynamoDB ✅")

# DynamoDB for projects  setup
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('portfolio_projects')

print(username)
table.put_item(
    Item={
        'username': username,
        'Projects': [{'id': i, 'project': project} for i, project in enumerate(projects)],
        
    }
)

# #info to take 
# #name
# #about
# #date of birth 
# #years of experience 
# #email 
# #projects 
# #project description
# #phone number 
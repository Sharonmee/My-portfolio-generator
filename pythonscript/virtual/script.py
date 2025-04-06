from github import Github 
import os
from dotenv import load_dotenv
from bs4 import BeautifulSoup
# Authentication is defined via github.Auth
from github import Auth
import boto3
import json

load_dotenv()
auth = Auth.Token(os.getenv('Github_token'))
g = Github(auth=auth)

username = "jerryagbesi"

##function to extract data based on the particular username 
user = g.get_user(username)
name = user.name
login = user.login
following = user.following
email = user.email
bio = user.bio
followingv= user.following
url = user.url
location = user.location
#Remember to ask for phone number directly with username


repo = user.get_repo(username)
readme = repo.get_readme()  
readme_content = readme.decoded_content.decode("utf-8")

soup = BeautifulSoup(readme_content, 'html.parser')

final_readme = soup.get_text()



for repo in user.get_repos():
    repo_name = repo.name
    repo_description = repo.description
    repo_URL = repo.html_url
    private = repo.private




bedrock = boto3.client(
    service_name='bedrock-runtime',
    region_name="us-east-1"
)


prompt = f"""
Help me write a beautiful and professional summary to include in my resume about myself. 
The summary should highlight the key features, purpose, and technologies used in the project. 
Here is the README content: {final_readme}.
 Here are the repository details:
    - Name: {repo_name}
    - Description: {repo_description}  based on my repositories include the technologies and a few projects i have worked on, pick the projects related to profession

Please ensure the summary is concise (around 100 - 150 words), professional, and suitable for a technical audience.

"""

# print(prompt)
input_data =  {
     "anthropic_version": "bedrock-2023-05-31",
    "max_tokens": 1000,
    "messages": [
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": prompt
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
# print(response)


response_body = json.loads(response.get('body').read())

# print(response_body)

completion = response_body.get('content')

# print(completion)
text = completion[0]['text']
print(text)



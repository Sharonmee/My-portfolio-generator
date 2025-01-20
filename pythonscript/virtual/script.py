from github import Github 
import os
from dotenv import load_dotenv
from bs4 import BeautifulSoup
# Authentication is defined via github.Auth
from github import Auth

load_dotenv()
auth = Auth.Token(os.getenv('Github_token'))
g = Github(auth=auth)

username = "JerryAgbesi"

##function to extract data based on the particular username 
user = g.get_user(username)
print(user.name)
print(user.login)
print(user.following)
print(user.email)
print(user.bio)
print(user.following)
print(user.url)
print(user.location)
#Ask for phone number directly with username


repo = user.get_repo(username)
readme = repo.get_readme()  # Fetch the README file
readme_content = readme.decoded_content.decode("utf-8")  # Decode the content
# print(readme_content)

soup = BeautifulSoup(readme_content, 'html.parser')

print(soup.get_text())


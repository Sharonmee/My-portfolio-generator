import json
import boto3

def lambda_handler(event, context):
    try:
        # Get username from query parameters
        username = event.get('queryStringParameters', {}).get('username')
        
        if not username:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'Username is required'})
            }

        # Initialize DynamoDB client
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('Portfolio_Data')

        # Get user data
        response = table.get_item(
            Key={
                'Username': username
            }
        )

        if 'Item' not in response:
            return {
                'statusCode': 404,
                'body': json.dumps({'error': 'User not found'})
            }

        # Enable CORS
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET'
        }

        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps(response['Item'])
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({
                'error': str(e)
            })
        } 
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://enpo5jyn97.execute-api.eu-west-2.amazonaws.com/Test/';
const PORTFOLIO_GENERATOR_URL = process.env.NEXT_PUBLIC_PORTFOLIO_GENERATOR_URL || 'https://4jxyzpdgu6.execute-api.eu-west-2.amazonaws.com/test/';

export async function fetchGitHubUserData(token: string) {
  try {
    const response = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `token ${token}`
      }
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('GitHub token is invalid or revoked. Please sign in again.');
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub user data:', error);
    throw error;
  }
}

export async function generatePortfolio(username: string) {
  try {
    console.log('Calling portfolio generator API...');
    const response = await fetch(PORTFOLIO_GENERATOR_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ username })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Portfolio generator error:', errorText);
      throw new Error(`Portfolio generator error: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error generating portfolio:', error);
    throw error;
  }
}

export async function fetchUserData(username: string) {
  try {
    const response = await fetch(`${BASE_URL}?username=${username}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const data = await response.text();
    
    if (!response.ok) {
      throw new Error('User not found');
    }

    return JSON.parse(data);
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
} 
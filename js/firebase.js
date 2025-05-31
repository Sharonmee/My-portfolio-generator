

import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.8.0/firebase-app.js';
import { 
  getAuth, 
  signInWithPopup, 
  GithubAuthProvider,
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/11.8.0/firebase-auth.js';

// Base URLs for APIs




let app;
let auth;
let provider;

async function initializeFirebase() {
  try {
    const response = await fetch('js/config.json');
    const config = await response.json();
    
    const firebaseConfig = {
      apiKey: config.apiKey,
      authDomain: config.authDomain.trim(),
      projectId: config.projectId.trim(),
      storageBucket: config.storageBucket.trim(),
      messagingSenderId: config.messagingSenderId.trim(),
      appId: config.appId.trim(),
      measurementId: config.measurementId.trim()
    };

    // Initialize Firebase
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    provider = new GithubAuthProvider();

    provider.addScope('repo');
    provider.addScope('user');

    // Set up auth state listener
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log('User is signed in:', user);
        document.querySelector('.loading').style.display = 'none';
      } else {
        // console.log('No user is signed in');
      }
    });

    return { app, auth, provider };
  } catch (error) {
    // console.error('Error initializing Firebase:', error);
    throw error;
  }
}

// GitHub sign-in function
export async function signInWithGitHub() {
  try {
    // Ensure Firebase is initialized
    if (!auth) {
      await initializeFirebase();
    }
    
    // console.log("Starting GitHub sign-in...");
    
    const result = await signInWithPopup(auth, provider);
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    
    // console.log("Firebase auth successful, user:", user);
    // console.log("Access token received:", !!token);
    
    if (!token) {
      throw new Error('No GitHub access token received');
    }
    
    // Fetch GitHub user data
    // console.log("Fetching GitHub user data...");
    const githubResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `token ${token}`
      }
    });
    
    if (!githubResponse.ok) {
      throw new Error(`GitHub API error: ${githubResponse.status}`);
    }
    
    const githubUser = await githubResponse.json();
    const username = githubUser.login;
    // console.log("GitHub username retrieved:", username);
    
    // Submit username to portfolio generator Lambda function
    // console.log("Making POST request to portfolio generator...");
    // console.log("Payload:", { username: username });
    try{
      const config = await fetch('js/config.json');
      const response = await config.json();

      const portfolioResponse = await fetch(response.PORTFOLIO_GENERATOR_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ username: username })
  
      });
      // console.log("POST response status:", portfolioResponse.status);
      // console.log("POST response headers:", Object.fromEntries(portfolioResponse.headers.entries()));

      if (portfolioResponse.ok) {
        // console.log("POST request successful, redirecting...");
        window.location.href = `myportfolio.html?username=${username}`;
      } else {
        const errorText = await portfolioResponse.text();
        // console.error("POST request failed with response:", errorText);
        throw new Error(`Portfolio generator error: ${portfolioResponse.status} - ${errorText}`);
      }
    
    }catch{
      // console.log(error)
    }


    

    
    return user;
    
  } catch (error) {
    // console.error("Error in signInWithGitHub:", error);
    throw error;
  }
}

document.getElementById('githubForm').addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent form submission
  document.querySelector('.loading').style.display = 'block';
  
  try {
    // Call the signInWithGitHub function directly
    await signInWithGitHub()
   
    ;
  } catch (error) {
    // console.error('Authentication error:', error);
    document.querySelector('.loading').style.display = 'none';
    alert('Authentication failed. Please try again.');
  }
});
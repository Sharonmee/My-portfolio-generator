const fs = require('fs');

// Get environment variables from Amplify
const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
    PORTFOLIO_GENERATOR_URL: process.env.REACT_APP_PORTFOLIO_GENERATOR_URL?.replace('http://', 'https://'),
    BASE_URL: process.env.REACT_APP_BASE_URL?.replace('http://', 'https://'),
    PROJECTS_BASE_URL: process.env.REACT_APP_PROJECTS_BASE_URL?.replace('http://', 'https://')
};

// Validate required environment variables
const requiredVars = [
    'REACT_APP_FIREBASE_API_KEY',
    'REACT_APP_FIREBASE_AUTH_DOMAIN',
    'REACT_APP_FIREBASE_PROJECT_ID',
    'REACT_APP_BASE_URL'
];

const missingVars = requiredVars.filter(varName => !process.env[varName]);
if (missingVars.length > 0) {
    console.error('Missing required environment variables:', missingVars.join(', '));
    process.exit(1);
}

// Write the config to a JSON file
fs.writeFileSync('./js/config.json', JSON.stringify(config, null, 2)); 
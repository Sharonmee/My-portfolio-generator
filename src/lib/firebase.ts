import { initializeApp } from 'firebase/app';
import { getAuth, GithubAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    "apiKey": "AIzaSyDs1FzXruAInN-Yx03SqD3cWQo8BVQbnww",
    "authDomain": "myportfolio-249cf.firebaseapp.com",
    "projectId": "myportfolio-249cf",
    "storageBucket": "myportfolio-249cf.appspot.com",
    "messagingSenderId": "991084925181",
    "appId": "1:991084925181:web:23ed8656ca51f8350b6e94",
    "measurementId": "G-1J0XC8XSCJ",
    "PORTFOLIO_GENERATOR_URL": "https://4jxyzpdgu6.execute-api.eu-west-2.amazonaws.com/test/",
    "BASE_URL": "https://enpo5jyn97.execute-api.eu-west-2.amazonaws.com/Test/",
    "PROJECTS_BASE_URL": "https://h99pu2exbe.execute-api.eu-west-2.amazonaws.com/prod"

}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const githubProvider = new GithubAuthProvider();

// Add GitHub scopes

export { app, auth, githubProvider };

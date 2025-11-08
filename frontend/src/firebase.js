import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBTMGQd4qym6qUGUDh0UCr6aT-7b7VjTXQ",
  authDomain: "job-portal-8505f.firebaseapp.com",
  projectId: "job-portal-8505f",
  storageBucket: "job-portal-8505f.firebasestorage.app",
  messagingSenderId: "577143341967",
  appId: "1:577143341967:web:34985c4fba39bde84b81fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();

export {auth, provider};
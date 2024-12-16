import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB7VB6EjkdUHd6TO7n4HhPn5LFW6XdkmuU",
  authDomain: "metube-76.firebaseapp.com",
  projectId: "metube-76",
  storageBucket: "metube-76.firebasestorage.app",
  messagingSenderId: "499779397269",
  appId: "1:499779397269:web:ee0547521054e3a4c95d9c",
  measurementId: "G-ETPW5M7SF3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)

export {app, auth}
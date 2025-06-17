// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAX7LsXKMw-MFefuFYuOzefv9LRv_x8ihI",
  authDomain: "notes-summerizer.firebaseapp.com",
  projectId: "notes-summerizer",
  storageBucket: "notes-summerizer.firebasestorage.app",
  messagingSenderId: "702388860300",
  appId: "1:702388860300:web:ede4a71be64314bf5f12a9",
  measurementId: "G-W1DV6GVQ1N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);
// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAq7IUrXx0sQCjSmQWJ06vdvJSsxTcCvVo",
  authDomain: "weeclass-453e3.firebaseapp.com",
  projectId: "weeclass-453e3",
  storageBucket: "weeclass-453e3.appspot.com",
  messagingSenderId: "1066836746917",
  appId: "1:1066836746917:web:de8106fdfa4c550144e34c",
  measurementId: "G-5QJZ7REC86",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = initializeFirestore(app, { experimentalForceLongPolling: true });

export { db, auth, app };

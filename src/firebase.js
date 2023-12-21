// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";

import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDsDLCt9vfhN6We9wpxEutoYPcw6XkGH0M",
    authDomain: "hacktiv8-hck65.firebaseapp.com",
    projectId: "hacktiv8-hck65",
    storageBucket: "hacktiv8-hck65.appspot.com",
    messagingSenderId: "668952178773",
    appId: "1:668952178773:web:5ac8aeb7bde67cb5f3e4dc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const provider = new GoogleAuthProvider();
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, updateProfile, GoogleAuthProvider  } from 'firebase/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useState, useEffect } from "react";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCO7raehPzvDv45SpNXvSrMO1uXYQbpBF4",
    authDomain: "leafty-app.firebaseapp.com",
    projectId: "leafty-app",
    storageBucket: "leafty-app.appspot.com",
    messagingSenderId: "941410860284",
    appId: "1:941410860284:web:50ebaddb30d43020e6ab79",
    measurementId: "G-8WZWR56RRY"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export function useAuth(){
  const [currentUser, setCurrentUser] = useState();

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])

  return currentUser;
}
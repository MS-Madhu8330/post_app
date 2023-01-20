import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC2WENkzainTMviazhX2lUtG9wE-sH-oF4",
  authDomain: "postapp-f4c6a.firebaseapp.com",
  projectId: "postapp-f4c6a",
  storageBucket: "postapp-f4c6a.appspot.com",
  messagingSenderId: "84145518129",
  appId: "1:84145518129:web:51968c8c8410fd3f9e8710",
  measurementId: "G-114HD95WJ7"
};
// we are configuring the firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);


//To use database functionalities
const db = firebaseApp.firestore();
// for storing images

const auth = firebase.auth();
const storage = firebase.storage();

// for google authentication

const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };
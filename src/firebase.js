import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB2M4bYjG3Yl7YElMh81pxIx_EncWwRIvc",
    authDomain: "instagram-clone-react-ef44d.firebaseapp.com",
    databaseURL: "https://instagram-clone-react-ef44d.firebaseio.com",
    projectId: "instagram-clone-react-ef44d",
    storageBucket: "instagram-clone-react-ef44d.appspot.com",
    messagingSenderId: "710163255404",
    appId: "1:710163255404:web:855b530b74727430af4849",
    measurementId: "G-YP3XEEQ0M4"
  });

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };

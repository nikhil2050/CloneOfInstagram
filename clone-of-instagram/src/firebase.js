import firebase from "firebase"

const firebaseApp = firebase.initializeApp({
    apiKey: "qwertyuiopasdfGHJKklzxcVBNM",
    authDomain: "clone-of-instagram.firebaseapp.com",
    databaseURL: "https://clone-of-instagram.firebaseio.com",
    projectId: "clone-of-instagram",
    storageBucket: "clone-of-instagram.appspot.com",
    messagingSenderId: "0987654321",
    appId: "1:1234567890:web:vgugfu66859ygbkf87o",
    measurementId: "G-VYGUKBt787YGH"
  });

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export {db, auth, storage};
  
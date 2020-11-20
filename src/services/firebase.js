import firebase from 'firebase/app'
require('firebase/auth')
require('firebase/storage')
require('firebase/firestore')


firebase.initializeApp({
    apiKey: "AIzaSyAIBxyhKHXJYdI8QuULxDUQHW1Y7-C4Y8Q",
    authDomain: "covid19cloud-da799.firebaseapp.com",
    databaseURL: "https://covid19cloud-da799.firebaseio.com",
    projectId: "covid19cloud-da799",
    storageBucket: "covid19cloud-da799.appspot.com",
    messagingSenderId: "226048158427",
    appId: "1:226048158427:web:831ce6940fba86cdd7bafe",
    measurementId: "G-RRSZ3H1B70"
});

export const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const db = firebase.firestore();

export const signInWithGoogle = () => {
  auth.signInWithPopup(googleProvider).then((res) => {
    console.log(res.user)
  }).catch((error) => {
    console.log(error.message)
  })
}

export const addDocument = () => {
  db.collection("users").add({
    first: "Ada",
    last: "Lovelace",
    born: 1815
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});

}
import firebase from 'firebase/app'
require('firebase/auth')
require('firebase/storage')

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

const storage = firebase.storage()

export const signInWithGoogle = () => {
  auth.signInWithPopup(googleProvider).then((res) => {
    console.log(res.user)
  }).catch((error) => {
    console.log(error.message)
  })
}


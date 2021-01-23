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
var news = db.collection("news");
var summaries = db.collection("summaries");

export const signInWithGoogle = () => {
  auth.signInWithPopup(googleProvider).then((res) => {
    console.log(res.user)
  }).catch((error) => {
    console.log(error.message)
  })
}

export const addCollection = (title, content, country, date, email, imageURL) => {
  news.add({
    title: title,
    content: content,
    country: country,
    date: date
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
}

export const updateCollection = (country_code, day, active_cases, name, new_cases, new_deaths, new_recovered, total_cases, total_deaths, total_recovered) => {
    var document = db.collection("summaries").doc(country_code);
    document.update({
        country: country_code,
        day: day,
        active_cases: active_cases,
        name: name,
        new_cases: new_cases,
        new_deaths: new_deaths,
        new_recovered: new_recovered,
        total_cases: total_cases,
        total_deaths: total_deaths,
        total_recovered: total_recovered,
    })
}

export const readCollection = async (name) => {
  const snapshot = await db.collection(name).get()

  return snapshot.docs.map(doc => doc.data());
}

export const readDocCollection = async (collection,doc) => {
  var docRef = db.collection(collection).doc(doc);

  var result = null;

  await docRef.get().then(function(doc) {
    if (doc.exists) {
        result = doc.data();
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});

  return result
}

export const addDocToCollection = (country_code, day, active_cases, name, new_cases, new_deaths, new_recovered, total_cases, total_deaths, total_recovered) => {
  db.collection("summaries").doc(country_code).set({
    country: country_code,
    day: day,
    active_cases: active_cases,
    name: name,
    new_cases: new_cases,
    new_deaths: new_deaths,
    new_recovered: new_recovered,
    total_cases: total_cases,
    total_deaths: total_deaths,
    total_recovered: total_recovered,
  });
}
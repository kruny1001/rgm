

import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/messaging'

var config = {
    apiKey: "AIzaSyDDcJTgPb4wuF-ZnJxGUYHcMgZebDWJmxE",
    authDomain: "whydots.firebaseapp.com",
    databaseURL: "https://whydots.firebaseio.com",
    projectId: "whydots",
    storageBucket: "",
    messagingSenderId: "105771837619",
    appId: "1:105771837619:web:e552ef4870d4ae75d268c6",
    measurementId: "G-36SQV9J6SB"
  };


// const settings = {/* your settings... */ timestampsInSnapshots: true};
// const firestore = firebase.firestore()
// firestore.settings(settings);

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app()


const firestore = firebase.firestore()
firestore.enablePersistence({synchronizeTabs:true})
  .then(function(){
    // console.log('success')
    // return firebase.firestore();
  })
  .catch(function(err) {
      console.log(err)
      if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
          
      } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
      }
  });
// const firestore = firebase.firestore()
// .enablePersistence().then(function() {
//   // Initialize Cloud Firestore through firebase
//   return firebase.firestore();
// })
const settings = {
  /* your settings... */ 
  timestampsInSnapshots: true,
  // experimentalTabSynchronization:true
};

// firestore.settings(settings);
// firestore.enablePersistence()

// // Export the database for components to use.
// // If you want to get fancy, use mixins or provide / inject to avoid redundant imports.
const database = firebase.database() //fbDatabase
const storage = firebase.storage()
const auth = firebase.auth()
const functions = firebase.functions()
const messaging = firebase.messaging()

export {
  database,
  storage,
  auth,
  firestore,
  functions,
  firebase,
//   messaging
}
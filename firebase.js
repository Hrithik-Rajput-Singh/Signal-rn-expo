import React from "react";
import firebase from "firebase/app";
import { FIREBASE_KEY } from "./key";
import Reduxthunk from "redux-thunk";

import "firebase/auth";
import "firebase/firestore"; // <- needed if using firestore
// import 'firebase/functions' // <- needed if using httpsCallable
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
} from "react-redux-firebase";
import { createFirestoreInstance, firestoreReducer } from "redux-firestore"; // <- needed if using firestore
import authenticReducer from "./store/reducer";

const fbConfig = {
  apiKey: FIREBASE_KEY,
  authDomain: "signal-8d731.firebaseapp.com",
  projectId: "signal-8d731",
  storageBucket: "signal-8d731.appspot.com",
  messagingSenderId: "1013489097867",
  appId: "1:1013489097867:web:5c394376f5afb04d37c88e",
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  // enableClaims: true // Get custom claims along with the profile
};

// Initialize firebase instance
firebase.initializeApp(fbConfig);

// Initialize other services on firebase instance
firebase.firestore(); // <- needed if using firestore
// firebase.functions() // <- needed if using httpsCallable

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
  auth: authenticReducer,
});

// Create store with reducers and initial state

const store = createStore(rootReducer, applyMiddleware(Reduxthunk));

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};

export default store;

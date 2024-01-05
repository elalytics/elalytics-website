import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyB0T4MHs9EA0onOdjdgLZupOYywrMZD_Gk",
  authDomain: "elalytics.firebaseapp.com",
  projectId: "elalytics",
  storageBucket: "elalytics.appspot.com",
  messagingSenderId: "493599989080",
  appId: "1:493599989080:web:e8e873f61c575f17e8d92d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db;

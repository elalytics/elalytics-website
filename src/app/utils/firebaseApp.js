import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyChm9rF1bTCtUxW52P_cmyxlgZnzNa8KCQ",
  authDomain: "gse-elalytics.firebaseapp.com",
  projectId: "gse-elalytics",
  storageBucket: "gse-elalytics.appspot.com",
  messagingSenderId: "447788620866",
  appId: "1:447788620866:web:e765be60ea1862c86561db",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db;

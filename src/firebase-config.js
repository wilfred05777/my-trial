import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

/// wilfred05777@gmail.com account console
const firebaseConfig = {
  apiKey: "AIzaSyDfzHyrI3k7D8FUPTJ6FFjGGVbnPDKJqZ8",
  authDomain: "house-marketplace-app-52fa4.firebaseapp.com",
  projectId: "house-marketplace-app-52fa4",
  storageBucket: "house-marketplace-app-52fa4.appspot.com",
  messagingSenderId: "664783942850",
  appId: "1:664783942850:web:6928952f6ebcac69b6b75b",
};

/// initialize firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

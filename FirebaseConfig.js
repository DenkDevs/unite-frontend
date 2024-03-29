// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBtPLAH1yfZcD_ndf2WMyLgPPteRX7FAbU",
	authDomain: "unite-fdcb6.firebaseapp.com",
	projectId: "unite-fdcb6",
	storageBucket: "unite-fdcb6.appspot.com",
	messagingSenderId: "631497655913",
	appId: "1:631497655913:web:2daaca9300a5489a4704f8",
	measurementId: "G-3HFDBKYWRS",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
// export const FIREBASE_ANALYT = getAnalytics(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
	REACT_APP_FIREBASE_API_KEY,
	REACT_APP_FIREBASE_APP_ID,
	REACT_APP_FIREBASE_AUTH_DOMAIN,
	REACT_APP_FIREBASE_MEASUREMENT_ID,
	REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	REACT_APP_FIREBASE_PROJECT_ID,
	REACT_APP_FIREBASE_STORAGE_BUCKET
} from "../environment";

const firebaseConfig = {
	apiKey: REACT_APP_FIREBASE_API_KEY,
	authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: REACT_APP_FIREBASE_APP_ID,
	measurementId: REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);

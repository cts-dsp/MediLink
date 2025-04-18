import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyB84-HPNeoUCb-mmHDzuXY9PtpjZBgIzu8",
  authDomain: "crested-century-457201-a8.firebaseapp.com",
  projectId: "crested-century-457201-a8",
  storageBucket: "crested-century-457201-a8.firebasestorage.app",
  messagingSenderId: "812127839181",
  appId: "1:812127839181:web:b8e5d472c2dedfd5e19a84"
};

const API_KEY = "API_KEY";
// Replace with your actual API key

const GEMINAI_API_KEY = "GEMINAI_API_KEY";
// Replace with your actual Gemini API key

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { auth, db, storage, API_KEY, GEMINAI_API_KEY };

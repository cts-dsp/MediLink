import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBLd3l6jiQ7j1jRdEqmfQG7_m_2JyPbwls",
  authDomain: "concise-torus-454822-c5.firebaseapp.com",
  projectId: "concise-torus-454822-c5",
  storageBucket: "concise-torus-454822-c5.firebasestorage.app",
  messagingSenderId: "212588019240",
  appId: "1:212588019240:web:e58c6867a4e07a1d5c7f1d",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { auth, db, storage };

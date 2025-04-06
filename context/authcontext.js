import React, { createContext, useState, useEffect, useContext } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { darkTheme, lightTheme } from "../constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("😇 You In => ");

        setIsAuthenticated(true);
        setUser({ ...user, id: user.uid });
        // fetch back the user details from firebase and update the user state with the new data
        fetchUser(user.uid);
      } else {
        console.log("😓 Not Auth => ");

        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return () => {
      unsub();
    };
  }, []);

  const register = async (email, password, name, phone, dob) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", response?.user.uid), {
        email: response?.user.email,
        name,
        username: email.split("@")[0],
        id: response?.user.uid,
        profileUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        phone,
        dob,
      });
      return { success: true, user: response?.user };
    } catch (e) {
      const msg = handleFirebaseError(e);
      return { success: false, msg };
    }
  };

  // Sign in an existing user
  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: response?.user };
    } catch (e) {
      const msg = handleFirebaseError(e);
      return { success: false, msg };
    }
  };

  // Sign out the current user
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      const msg = handleFirebaseError(e);
      return { success: false, msg };
    }
  };

  //password reset function firebase

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (e) {
      const msg = handleFirebaseError(e);
      return { success: false, msg };
    }
  };

  const fetchUser = async (uid) => {
    const userRef = doc(db, "users", uid);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      setUser(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.error("No such document!");
    }
  };

  // Favourites

  const [favourites, setFavourites] = useState([]);

  const saveFavourites = async (value, id) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`@favourites-${id}`, jsonValue);
    } catch (e) {
      console.log("error storing", e);
    }
  };

  const loadFavourites = async (id) => {
    try {
      const value = await AsyncStorage.getItem(`@favourites-${id}`);
      if (value !== null) {
        setFavourites(JSON.parse(value));
      }
    } catch (e) {
      console.log("error loading", e);
    }
  };

  const add = (therapy) => {
    const newFavourites = [...favourites, therapy];
    setFavourites(newFavourites);
  };

  const remove = (id) => {
    const newFavourites = favourites.filter((x) => x.id !== id);
    setFavourites(newFavourites);
  };

  useEffect(() => {
    if (user && user.id) {
      loadFavourites(user.id);
    }
  }, [user]);

  useEffect(() => {
    if (user && user.id && favourites.length) {
      saveFavourites(favourites, user.id);
    }
  }, [favourites, user]);

  // Provide the AuthContext value to the children components
  const authContextValue = {
    user,
    setUser,
    isAuthenticated,
    register,
    login,
    logout,
    resetPassword,
    isDarkMode,
    toggleTheme,
    theme: isDarkMode ? darkTheme : lightTheme,
    favourites,
    addToFavourites: add,
    removeFromFavourites: remove,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return value;
};

const handleFirebaseError = (error) => {
  console.error(error);
  let msg = error.message;
  if (msg.includes("auth/email-already-in-use")) {
    msg = "Email already in use";
  } else if (msg.includes("auth/invalid-email")) {
    msg = "Invalid email";
  } else if (msg.includes("auth/weak-password")) {
    msg = "Password should be at least 6 characters";
  } else if (msg.includes("auth/user-not-found")) {
    msg = "User not found";
  } else if (msg.includes("auth/invalid-credential")) {
    msg = "Invalid credentials";
  } else if (msg.includes("auth/too-many-requests")) {
    msg = "Too many requests, please try again later";
  } else if (msg.includes("auth/network-request-failed")) {
    msg = "Network request failed, please try again later";
  }

  return msg;
};

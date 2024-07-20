import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, getIdToken } from "firebase/auth";
import { initializeApp } from "firebase/app";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCWv4BWNbEHkBUpDl9MeiVb79ITe1eKHqg",
  authDomain: "rhapsody-6d20c.firebaseapp.com",
  projectId: "rhapsody-6d20c",
  storageBucket: "rhapsody-6d20c.appspot.com",
  messagingSenderId: "683139077973",
  appId: "1:683139077973:web:ce55e0832b8451de7b41dc",
  measurementId: "G-KKEGEL22C7",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const useUser = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idToken = await getIdToken(user, true);
        setUser({ ...user, idToken });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, isLoading };
};

export default useUser;

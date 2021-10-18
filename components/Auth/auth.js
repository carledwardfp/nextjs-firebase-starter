import { useState, useEffect, useContext, createContext } from "react";
import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fSignOut,
  sendPasswordResetEmail as fSendPasswordResetEmail,
  confirmPasswordReset as fConfirmPasswordReset,
} from "firebase/auth";
// Firestore (optional): uncomment the next line if you want to create a database for your users
// import {
//   getFirestore,
//   collection,
//   addDoc,
//   Timestamp,
// } from "firebase/firestore";
import { config } from "./config";

// initialize auth context
const AuthContext = createContext();

// hook that we can use anywhere in the app
export const useAuth = () => useContext(AuthContext);

// this will be the wrapper of the whole auth context that will be used in _app.js
export const AuthProvider = ({ children }) => {
  const auth = useAuthProvider();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

// firebase functions are defined here
const useAuthProvider = () => {
  let firebaseApp;
  if (!getApps().length) {
    firebaseApp = initializeApp(config);
  }
  const auth = getAuth(firebaseApp);

  // Firestore (optional): uncomment the next line if you want to create a database for your users
  // const db = getFirestore(firebaseApp);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(false);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [user]);

  const signIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email, password) => {
    // Firestore (optional): uncomment the next line if you want to create a database for your users
    // const usersRef = collection(db, "users");

    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Firestore (optional): uncomment the next block of code if you want to create a database for your users
    // await addDoc(usersRef, { // adds new user to 'users' collection
    //   uuid: response.user.uid,
    //   timestamp: Timestamp.now(),
    //   email,
    // });
  };

  const signOut = async () => {
    await fSignOut(auth);
  };

  const sendPasswordResetEmail = async (email) => {
    await fSendPasswordResetEmail(auth, email);
  };

  const confirmPasswordReset = async (password, oobCode) => {
    await fConfirmPasswordReset(auth, oobCode, password);
  };

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
};

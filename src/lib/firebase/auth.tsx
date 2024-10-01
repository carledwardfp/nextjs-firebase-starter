"use client";

import {
  createUserWithEmailAndPassword,
  confirmPasswordReset as fConfirmPasswordReset,
  sendPasswordResetEmail as fSendPasswordResetEmail,
  signOut as fSignOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  type User,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./client";
import { firebaseConfig } from "./config";

interface IAuthContext {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  confirmPasswordReset: (password: string, oobCode: string) => Promise<void>;
}

const AuthContext = createContext<IAuthContext | null>(null);

// hook that we can use anywhere in the app
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(`'useAuth' was used outside of AuthProvider`);
  }

  return context;
};

interface IAuthProvider {
  serverUser: User | null;
  children: React.ReactNode;
}

export const AuthProvider = ({ serverUser, children }: IAuthProvider) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(serverUser);
  const [loading, setLoading] = useState(true);

  // NOTE: Register the service worker that sends auth state back to server
  // The service worker is built with `npm run build-service-worker`
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const serializedFirebaseConfig = encodeURIComponent(
        JSON.stringify(firebaseConfig)
      );
      const serviceWorkerUrl = `/auth-service-worker.js?firebaseConfig=${serializedFirebaseConfig}`;

      navigator.serviceWorker
        .register(serviceWorkerUrl)
        .then((registration) => console.log("scope is: ", registration.scope));
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (user === undefined) return;

      // refresh when user changed to ease testing
      if (user?.email !== authUser?.email) {
        router.refresh();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const signUp = async (email: string, password: string) => {
    // Firestore (optional): uncomment the next line if you want to create a database for your users
    // const usersRef = collection(db, "users");

    await createUserWithEmailAndPassword(auth, email, password);

    // Firestore (optional): uncomment the next block of code if you want to create a database for your users
    // await addDoc(usersRef, {
    //   // adds new user to 'users' collection
    //   uuid: response.user.uid,
    //   timestamp: Timestamp.now(),
    //   email,
    // });
  };

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const signOut = async () => {
    await fSignOut(auth);
  };

  const sendPasswordResetEmail = async (email: string) => {
    await fSendPasswordResetEmail(auth, email);
  };

  const confirmPasswordReset = async (password: string, oobCode: string) => {
    await fConfirmPasswordReset(auth, oobCode, password);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signUp,
        signIn,
        signInWithGoogle,
        signOut,
        sendPasswordResetEmail,
        confirmPasswordReset,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

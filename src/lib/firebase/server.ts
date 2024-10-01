import { type FirebaseApp, initializeServerApp } from "firebase/app";
import { getAuth, type User } from "firebase/auth";
import { headers } from "next/headers";
import { firebaseConfig } from "./config";

/**
 * This function can be used in the server such as Server Components
 *
 * @returns {Object} firebaseServerApp - The server app you can use
 * @returns {Object} currentUser - The user from the server (can be null)
 */
export const getAuthenticatedAppForUser = async (): Promise<{
  firebaseServerApp: FirebaseApp;
  currentUser: User | null;
}> => {
  const authIdToken = headers().get("Authorization")?.split("Bearer ")[1];
  const firebaseServerApp = initializeServerApp(
    firebaseConfig,
    authIdToken ? { authIdToken } : {}
  );

  const auth = getAuth(firebaseServerApp);
  await auth.authStateReady();

  return { firebaseServerApp, currentUser: auth.currentUser };
};

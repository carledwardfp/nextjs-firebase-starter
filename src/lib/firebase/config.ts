import { clientEnvs } from "../envs/client";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: clientEnvs.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: clientEnvs.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: clientEnvs.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: clientEnvs.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: clientEnvs.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: clientEnvs.NEXT_PUBLIC_FIREBASE_APP_ID,
};

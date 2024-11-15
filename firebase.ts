import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import type { FirebaseApp } from "firebase/app";
import type { Auth } from "firebase/auth";

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
}

const firebaseConfig: FirebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
};

const app: FirebaseApp = initializeApp(firebaseConfig);

const auth: Auth = getAuth(app);

export default auth;

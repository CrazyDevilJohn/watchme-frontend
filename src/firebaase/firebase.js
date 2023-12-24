import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseConfig } from "../config/firebase.config";

export const app =
  getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const fetchUser = () => {
  onAuthStateChanged(firebaseAuth).then((value) => console.log(value));
};

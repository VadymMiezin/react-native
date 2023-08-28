import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAJFXFd9kgmdU1LG5BPqDEQ4y2TEY6CijU",
  authDomain: "goit-reactnative-7ccf1.firebaseapp.com",
  databaseURL:
    "https://goit-reactnative-7ccf1-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "goit-reactnative-7ccf1",
  storageBucket: "goit-reactnative-7ccf1.appspot.com",
  messagingSenderId: "620734335237",
  appId: "1:620734335237:web:08ca68dc726dc5511b4f6c",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

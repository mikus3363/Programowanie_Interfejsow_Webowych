import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCLYeOHbmLM6pIl60Mh6wRxizyaxGonEUk",
    authDomain: "books-app-ml.firebaseapp.com",
    projectId: "books-app-ml",
    storageBucket: "books-app-ml.appspot.com",
    messagingSenderId: "177606514707",
    appId: "1:177606514707:web:28d645822a33a14c229b66",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

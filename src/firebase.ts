import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAWKIFGMT3BG_TVcNPD5NW6xyy5b3feX1w",
    authDomain: "twitter-clone-5f4ac.firebaseapp.com",
    projectId: "twitter-clone-5f4ac",
    storageBucket: "twitter-clone-5f4ac.appspot.com",
    messagingSenderId: "628214391782",
    appId: "1:628214391782:web:0c348d0f08dde63d586c27"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
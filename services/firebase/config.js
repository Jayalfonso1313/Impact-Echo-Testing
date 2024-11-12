import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCiJs6SHZYEbJDdOY2bDp-z1GnNuRnhVtQ",
  authDomain: "fake-usonic.firebaseapp.com",
  databaseURL: "https://fake-usonic-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fake-usonic",
  storageBucket: "fake-usonic.appspot.com",
  messagingSenderId: "376355277342",
  appId: "1:376355277342:web:afe506bf79dcc12ae13c0f"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app); // Initialize Firebase database instance
const storage = getStorage(app); // Initialize Firebase storage instance

export { db, storage }; // Export database and storage instances
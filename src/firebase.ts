// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_API_KEY,
  authDomain: "image-gallery-4c65b.firebaseapp.com",
  projectId: "image-gallery-4c65b",
  storageBucket: "image-gallery-4c65b.appspot.com",
  messagingSenderId: "636341452712",
  appId: "1:636341452712:web:820fdcb62d10d5c1c1e79d",
  measurementId: "G-RLLM3Y69VV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

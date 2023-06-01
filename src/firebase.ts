// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxBDWp5tagLwUNX3kUOpPO2cCZh0VV00s",
  authDomain: "academy-home.firebaseapp.com",
  databaseURL: "https://academy-home-default-rtdb.firebaseio.com",
  projectId: "academy-home",
  storageBucket: "academy-home.appspot.com",
  messagingSenderId: "252524948138",
  appId: "1:252524948138:web:c5f9f812af73a8c520fed3",
  measurementId: "G-73N4VS40SG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
const storage = getStorage(app);
const auth = getAuth(app);

export { storage, auth };

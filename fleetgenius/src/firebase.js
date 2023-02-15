
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCANuczAsCo7MObCwctuEgGkyJvjkj0IEw",
  authDomain: "fleetgenius-3eba1.firebaseapp.com",
  projectId: "fleetgenius-3eba1",
  storageBucket: "fleetgenius-3eba1.appspot.com",
  messagingSenderId: "7334360112",
  appId: "1:7334360112:web:45a967a0afd8a1050de9f5",
  measurementId: "G-MCX2HHYLBS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
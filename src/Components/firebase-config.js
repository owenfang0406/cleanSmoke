// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
// import { getAuth } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";

const firebaseConfig = {
apiKey: "AIzaSyDaHlO84JS-V2jNtrhe9DCwOFq9iShnXoc",
authDomain: "clearsome-d2515.firebaseapp.com",
projectId: "clearsome-d2515",
storageBucket: "clearsome-d2515.appspot.com",
messagingSenderId: "957302702642",
appId: "1:957302702642:web:c2404cd78b6c934a1a322b",
measurementId: "G-5D9PHG5SGW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
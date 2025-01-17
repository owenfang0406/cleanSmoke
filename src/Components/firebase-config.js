// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
// import { getAuth } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
apiKey: "AIzaSyDaHlO84JS-V2jNtrhe9DCwOFq9iShnXoc",
authDomain: "clearsome-d2515.firebaseapp.com",
projectId: "clearsome-d2515",
storageBucket: "clearsome-d2515.appspot.com",
messagingSenderId: "957302702642",
appId: "1:957302702642:web:c2404cd78b6c934a1a322b",
measurementId: "G-5D9PHG5SGW"
};

// const firebaseConfig = {
//     apiKey: "AIzaSyBPqIi1GpDlJxx_oMP2N9eeUyiDWLzsF3A",
//     authDomain: "reactpracticewehelp.firebaseapp.com",
//     projectId: "reactpracticewehelp",
//     storageBucket: "reactpracticewehelp.appspot.com",
//     messagingSenderId: "368828982385",
//     appId: "1:368828982385:web:a44f8f5ab7408623df67d0"
//   };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
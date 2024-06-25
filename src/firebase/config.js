// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
//PRODUCTION
// const firebaseConfig = {
//   apiKey: "AIzaSyD2iCWrW17HP0aPlxj1wu5QDTYYeKDtBxU",
//   authDomain: "react-courses-2f979.firebaseapp.com",
//   projectId: "react-courses-2f979",
//   storageBucket: "react-courses-2f979.appspot.com",
//   messagingSenderId: "808684912576",
//   appId: "1:808684912576:web:de5aec534aeb21f6271225"
// };

//TESTING
const firebaseConfig = {

  apiKey: "AIzaSyCyxVhJilEvG31hZ1lYiPTECMd_oqmg_Pg",

  authDomain: "testing-b6d56.firebaseapp.com",

  projectId: "testing-b6d56",

  storageBucket: "testing-b6d56.appspot.com",

  messagingSenderId: "542650545833",

  appId: "1:542650545833:web:bd00c0eda0be0e18575bb8"

};


// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);

export const FirebaseDB = getFirestore(FirebaseApp);
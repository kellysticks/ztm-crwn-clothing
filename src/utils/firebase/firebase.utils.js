import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1KjSAeJH_0Xi8il6E5-nvtU8Y0MFk5Vc",
  authDomain: "ztm-crwn-clothing-db-1bb29.firebaseapp.com",
  projectId: "ztm-crwn-clothing-db-1bb29",
  storageBucket: "ztm-crwn-clothing-db-1bb29.appspot.com",
  messagingSenderId: "1004109838516",
  appId: "1:1004109838516:web:a18ae8f2899b029c4abfe1",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
//GoogleAuthProvider() is a class
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists());
  
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log(`error creating the user - ${error.message}`);
    }
  }

  return userDocRef;
  //Check if user data exists, if yes return data
  //If user data doesn't exist, create data from userAuth in my collection
};

import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,

} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from "firebase/firestore";

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
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
// export const signInUserWithEmailAndPassword = (email, password) => signInWithEmailAndPassword(auth, email, password);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd, field) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object[field].toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();

}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);
  
  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
  return categoryMap;
}

export const createUserDocumentFromAuth = async (userAuth, addInformation = {}) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt, ...addInformation });
    } catch (error) {
      console.log(`Error creating the user - ${error.message}`);
    }
  }

  return userDocRef;
  //Check if user data exists, if yes return data
  //If user data doesn't exist, create data from userAuth in my collection
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  try {
    return await createUserWithEmailAndPassword(auth, email, password)
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      alert('Cannot create user, email already in use')
    } else {
      console.log(`error creating the user - ${error.message}`);
    }
  }
}

export const signInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  // try {
  return await signInWithEmailAndPassword(auth, email, password);
  // } catch (error) {
  //     console.log(`error logging in user - ${error.message}`);
  // }
}

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
}

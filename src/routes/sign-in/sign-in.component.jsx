import {useEffect} from 'react'
import {getRedirectResult } from "firebase/auth";
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

import {
  auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInWithGoogleRedirect,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {

  const asyncRedirectResult = async() => {
    const result = await getRedirectResult(auth);
    if(result){
      asyncCreateUser(result.user)
    }
  }
  const asyncCreateUser = async (user) =>{
    const userDocRef = await createUserDocumentFromAuth(user);
  }

  useEffect(() => {
      asyncRedirectResult();
  }, []);

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };
  const logGoogleRedirectUser = async () => {
    const { user } = await signInWithGoogleRedirect();
  };

  return (
    <div>
      <h1>I'm Sign In</h1>
      <button onClick={logGoogleUser}>Sign In</button>
      <button onClick={signInWithGoogleRedirect}>Sign In With Redirect</button>
      <SignUpForm/>
    </div>
  );
};

export default SignIn;

import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user)
    }

  return (
    <div>
      <h1>I'm Sign In</h1>
      <button onClick={logGoogleUser}>Sign In</button>
    </div>
  );
};

export default SignIn;

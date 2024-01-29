import { signInWithGooglePopup } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        console.log({response})
    }

  return (
    <div>
      <h1>I'm Sign In</h1>
      <button onClick={logGoogleUser}>Sign In</button>
    </div>
  );
};

export default SignIn;

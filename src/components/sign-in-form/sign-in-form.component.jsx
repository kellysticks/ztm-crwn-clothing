import { useEffect, useState} from "react";
import { getRedirectResult } from "firebase/auth";
import {
  auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInWithGoogleRedirect,
  signInUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-in-form.styles.scss'

const defaultSignInFields = {
  email: "",
  password: "",
};

const SignInForm = () => {

  const [signInFields, setSignInFields] = useState(defaultSignInFields);
  const { email, password } = signInFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignInFields({ ...signInFields, [name]: value });
  };
  const resetFormFields = () => {
    setSignInFields(defaultSignInFields);
  }

  const asyncRedirectResult = async () => {
    const result = await getRedirectResult(auth);
    if (result) {
      asyncCreateUser(result.user);
    }
  };
  const asyncCreateUser = async (user) => {
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  useEffect(() => {
    asyncRedirectResult();
  }, []);

  const signInGoogleUser = async () => {
    await signInWithGooglePopup();
  };

  const logGoogleRedirectUser = async () => {
    const { user } = await signInWithGoogleRedirect();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { user } = await signInUserWithEmailAndPassword(email, password);
      resetFormFields()
      console.log(user);
    } catch (error) {
      switch(error.code){
        case 'auth/invalid-credential':
        alert(`You've entered invalid credentials. Review your credentials and try again.`)
        break;
        case 'auth/wrong-password':
        alert(`Incorrect password! Please try again.`)
        break;
        case 'auth/user-not-found':
        alert( `There is no user associated with this email. Enter valid credentials or create a new user`)
        break;
        default:
        console.log(`User is experiencing the following error ${error.message}`) 
      }
    }
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
      <FormInput
        label="Email"
        name="email"
        type="email"
        required
        onChange={handleChange}
        value={email}
      />
      <FormInput
        label="Password"
        name="password"
        type="password"
        required
        onChange={handleChange}
        value={password}
      />
      <div className="buttons-container">
      <Button type='submit'>Sign In</Button>
      <Button type='button' buttonType="google" onClick={signInGoogleUser}>
        Google Sign In
      </Button>
      </div>
      </form>
    </div>
  );
};

export default SignInForm;

import { useState} from "react";
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import {SignUpContainer, Subtitle} from "./sign-up-form.styles"

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({...formFields, [name]: value})
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    //check passwords match
    if(password !== confirmPassword){
        alert('passwords do not match') 
        return;
    }
    try{
      const {user} = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(user, {displayName})
      resetFormFields()
    } catch(error) {
      console.log(` user creation encountered an ${error}`)
    }

    //check if we've authenticated user
    //create user document
}

  return (
    <SignUpContainer>
      <Subtitle>Don't have an account?</Subtitle>
      <span>Sign Up With Your Email and Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Display Name'
          name="displayName"
          type="text"
          required
          onChange={handleChange}
          value={displayName}
        />
        <FormInput
          label='Email'
          name="email"
          type="email"
          required
          onChange={handleChange}
          value={email}
        />
        <FormInput
          label='Password'
          name="password"
          type="password"
          required
          onChange={handleChange}
          value={password}
        />
        <FormInput
          label='Confirm Password'
          name="confirmPassword"
          type="password"
          required
          onChange={handleChange}
          value={confirmPassword}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;

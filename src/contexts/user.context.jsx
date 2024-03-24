import {createContext, useEffect, useState} from 'react'
import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';

//Actually value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
})

//Provider you want to use - the actual component we will use in other components
export const UserProvider = ({children}) => {
    //we're making this useState for currentUser and its setter function available to any components in the children's component tree
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser}
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user)=>{
            if(user){
                createUserDocumentFromAuth(user);
            }
            console.log(user)
            setCurrentUser(user)
        })
        return unsubscribe
    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

//if multiple components are listening to a context, even if they don't use the actual value, will cause react to re-run your function 
//but they doesn't mean it'll re-render anything to the DOM
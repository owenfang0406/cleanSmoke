import React, {useEffect, useState, useContext, createContext} from 'react'
import { auth } from '../firebase-config'
import { onAuthStateChanged, signOut } from "firebase/auth";
import LogInButton from '../LogIn/LogInButton';
import SignOut from './SignOut';

const UserContext = createContext({});

function AuthDetails() {
  const [authUser, setAuthUser] = useState(null);
  useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
              setAuthUser(user);
            }else {
              setAuthUser(null);
            }
          return () => {
            listen();
          }
        })
  }, []);

  const userSignOut = () => {
      signOut(auth).then(()=> {
        console.log("logged out!")
      }).catch(err=> console.log(err));
  }


  return (
    <>
    <UserContext.Provider value={{ authUser, userSignOut }}>
      <LogInButton /> 
      <div>{ authUser ? <><div>Signed In </div>
                          <SignOut></SignOut>
                          <button onClick={userSignOut}>SignOut</button>
                        </>: <div>Signed Out</div>}</div> 
    </UserContext.Provider>
    </>
  )
}

export default AuthDetails
export {UserContext}
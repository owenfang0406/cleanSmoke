import React, {useEffect, useState} from 'react'
import { auth } from '../firebase-config'
import { onAuthStateChanged, signOut } from "firebase/auth";
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
  }, [])

  const userSignOut = () => {
      signOut(auth).then(()=> {
        console.log("logged out!")
      }).catch(err=> console.log(err));
  }

  return (
    <div>{ authUser ? <><div>Signed In </div>
                        <button onClick={userSignOut}>SignOut</button>
                      </>: <div>Signed Out</div>}</div>
  )
}

export default AuthDetails
import React, {useContext} from 'react'
import {UserContext} from "../../index";

function SignOut() {
  const { userSignOut, authUser } = useContext(UserContext);
  console.log(authUser)
  console.log(userSignOut)
  return (
    authUser ? <button onClick={userSignOut}>SignOut</button> : <div>Please Log in</div>
  )
}

export default SignOut
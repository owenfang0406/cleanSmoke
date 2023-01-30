import React from 'react'
import { app } from '../firebase-config'

function SignOut() {
    const auth = app.auth()
  return (
    <button onClick={() => auth.signOut()}>SignOut</button>
  )
}

export default SignOut
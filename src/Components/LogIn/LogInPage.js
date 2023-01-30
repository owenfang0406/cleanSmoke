import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {auth} from '../firebase-config'
import { signInWithEmailAndPassword } from "firebase/auth";

function SignIn() {
    const [showSignUp, setShowSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try{
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
            })
        } catch (e) {
            setError(e.message);
            console.log(e.message);
        }
    }

  return (
    <>
        <div>
            <div>
                <h1>Sign in to your account</h1>
                <div>
                    Don't have an account ? <Link to="/signup">Sign up.</Link>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email Address</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter you email"></input>
                </div>
                <div>
                    <label>Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter you password" value={password}></input>
                </div>
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    </>
  )
}

export default SignIn
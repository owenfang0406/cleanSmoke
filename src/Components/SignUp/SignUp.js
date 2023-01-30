import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {auth} from '../firebase-config';
import { createUserWithEmailAndPassword } from "firebase/auth";

function SignUp() {
    const [showSignUp, setShowSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // const {createUser} = UserAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try{
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
            })
        } catch (e) {
            setError(e.message);
            console.log(e);
        }
    }


  return (
    <>
        <div>
            <div>
                <h1>Sign Up for your account</h1>
                <div>
                    Already have an account ? <Link to="/Login">Sign in.</Link>
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

export default SignUp
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {auth} from '../firebase-config';
import { createUserWithEmailAndPassword } from "firebase/auth";
import styles from "./LoginPage.module.css";
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import { db } from '../firebase-config';
import { v4 } from 'uuid';
import { doc, setDoc, collection, addDoc } from 'firebase/firestore';

function SignUp() {
    const [showSignUp, setShowSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [isPhotographer, setIsPhotographer] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                if (email === userCredential.user.email){
                    const updatedRef = doc(db, 'users',`${userCredential.user.uid}`);
                    const DefaultProfilesObject = {
                        email: email,
                        name: 'user',
                        birth: '1911-01-01',
                        gender: 'Non-binary',
                        avatarURL: 'https://firebasestorage.googleapis.com/v0/b/reactpracticewehelp.appspot.com/o/avatar%2Fuser.png?alt=media&token=94360920-a87a-48cb-8222-0b3f66b36bb5',
                        uid: userCredential.user.uid,
                        photographer:isPhotographer,
                    }
                    setDoc(updatedRef,
                        {Profiles:DefaultProfilesObject},
                        ).then((resp)=> {
                        navigate("/");
                    }
                    )
                }
            }).catch(error => {
                setError(error.message)
            })
        }

  return (
    <>
    <NavBar></NavBar>
        <div className={styles.pageContainer}>
            <div className={styles.formText}>
                <h1 className={styles.h1}>Sign Up for your account</h1>
                <div className={styles.SignupSlogn}>
                    Already have an account ?<span className={styles.signupLink}><Link to="/login">Sign in.</Link></span>
                </div>
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.emailContainer}>
                    <label className={styles.email}>Email Address</label>
                    <input className={styles.emailInput} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email"></input>
                </div>
                <div>
                    <label className={styles.password}>Password</label>
                    <input className={styles.emailInput} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter your password" value={password}></input>
                </div>
                <div className={styles.signUpIdentityCon}>
                    <button type="button" className={`${styles.identityBtn} ${!isPhotographer ? styles.isPhotographer : ""}`} onClick={() => setIsPhotographer(false)}>User</button>
                    <button type="button" className={`${styles.identityBtn} ${isPhotographer ? styles.isPhotographer : ""}`} onClick={() => setIsPhotographer(true)}>Photog</button>
                </div>
                <div className={styles.notes}>*Register as a photog enables clients to appoint with you here</div>
                <div className={styles.btnCon}>
                    <button className={styles.signupBtn} type='submit'>Sign Up</button>
                </div>
                {/* <div className={styles.signinOptions}>
                    <div className={styles.google}>
                        <img className={styles.icon} src={require('./google.png')}></img><span>Sign up with Google</span>
                    </div>
                    <div className={styles.google}>
                    <img className={styles.icon} src={require('./facebook.png')}></img><span>Sign up with FaceBook</span>
                    </div>
                    <div className={styles.google}>
                    <img className={styles.icon} src={require('./twitter.png')}></img><span>Sign up with Twitter</span>
                    </div>
                </div> */}
                <div id='errormsg' className={styles.err}>
                    {error && <div>{error}</div>} 
                </div>
            </form>
        </div>
    <Footer></Footer>
    </>
  )
}
export default SignUp
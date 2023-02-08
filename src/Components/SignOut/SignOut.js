import React, {useContext} from 'react'
import {UserContext} from "../../index";
import { useNavigate } from 'react-router-dom';
import { MdLogout } from "react-icons/md";
import styles from "./SignOut.module.css"

function SignOut() {
  const navigate = useNavigate()
  const handleSignOut = () => {
    userSignOut();
    navigate("/")
  };
  const { userSignOut, authUser } = useContext(UserContext);
  return (
    authUser ? <div onClick={handleSignOut}><MdLogout className={styles.logOutBtn}></MdLogout></div> : <div>Please Log in</div>
  )
}

export default SignOut
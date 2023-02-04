import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import {FaUser} from "react-icons/fa";
import styles from "./Button.module.css";
import {UserContext} from "../../index";

function LogInButton() {
  const { authUser, userSignOut } = useContext(UserContext);
  console.log("LogInBtn: " + authUser)
  return (
    authUser ? 
      <Link to="/member">
        <button className={styles.button}>
          <FaUser />
        </button>
      </Link> : 
      <Link to="/login">
        <button className={styles.button}>
          <FaUser />
        </button>
      </Link>
  );
}

export default LogInButton
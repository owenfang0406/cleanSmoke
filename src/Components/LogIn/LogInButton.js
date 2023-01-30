import React from 'react'
import { Link } from 'react-router-dom'
import {FaUser} from "react-icons/fa";
import styles from "./Button.module.css";

function LogInButton() {
  return (
    <Link to="/login"><button className={styles.button}><FaUser/></button></Link>
  )
}

export default LogInButton
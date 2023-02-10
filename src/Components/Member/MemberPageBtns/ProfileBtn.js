import React from 'react';
import styles from "./buttons.module.css"
import { Link } from 'react-router-dom';
import { MdInfoOutline } from "react-icons/md";

function ProfileBtn() {
  return (
   <Link to="/member/profile" className={styles.links}><MdInfoOutline className={styles.Btn}></MdInfoOutline></Link>
  )
}

export default ProfileBtn
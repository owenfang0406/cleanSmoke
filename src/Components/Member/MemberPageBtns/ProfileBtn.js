import React from 'react';
import styles from "./buttons.module.css"
import { Link } from 'react-router-dom';

function ProfileBtn() {
  return (
   <Link to="/member/profile" className={styles.links}><div className={styles.Btn}>Profile</div></Link>
  )
}

export default ProfileBtn
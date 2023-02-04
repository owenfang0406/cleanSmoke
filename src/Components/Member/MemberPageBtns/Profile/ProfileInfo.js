import React, {useContext, useState, useEffect} from 'react'
import {UserContext} from "../../../../index";
import styles from "./ProfilePage.module.css";
import AvatarUpload from './AvatarUpload';

function ProfileInfo() {
  const { authUser, userSignOut } = useContext(UserContext);
  const [email, setEmail] = useState(authUser? authUser.email : "");

  useEffect(() => {
    if (authUser){
      console.log(authUser)
      setEmail(authUser.email)
      console.log(authUser.email);
    }}, [authUser]);

  return (
    <div className={styles.wrapper}>
      <div>
        <div></div>
        <AvatarUpload></AvatarUpload>
      </div>
      <div>
        <label>Email: </label>
        <input type="email" value={email} disabled></input>
      </div>
    </div>
  )
}

export default ProfileInfo
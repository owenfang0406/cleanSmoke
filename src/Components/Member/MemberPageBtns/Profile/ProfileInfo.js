import React, {useContext, useState, useEffect} from 'react'
import {UserContext} from "../../../../index";
import styles from "./ProfilePage.module.css";
import AvatarUpload from './AvatarUpload';
import { MdModeEdit, MdArrowForwardIos } from "react-icons/md";
import { Link } from 'react-router-dom';

function ProfileInfo() {
  const { authUser, userSignOut, avatarURL } = useContext(UserContext);
  const [email, setEmail] = useState(authUser? authUser.email : "");

  useEffect(() => {
    if (authUser){
      console.log(authUser)
      setEmail(authUser.email)
      console.log(authUser.email);
    }}, [authUser]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.infoCon}>
        <div className={styles.avatarWrapper}>
          <Link to="/member/updateAvatar">
            <div className={styles.avatarCon}>
              <img className={styles.avatar} src={avatarURL? avatarURL : ""}></img>
              <div className={styles.editBtn}>
                <MdModeEdit className={styles.editIcon}></MdModeEdit>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className={styles.infoListCon}>
        <div className={styles.infoTitle}>
            Profile Information
        </div>
        <div className={styles.inputCon}>
          <label>Email: </label>
          <input className={`${styles.inputs}`} type="email" value={email} disabled></input>
          <MdArrowForwardIos className={styles.inputIcons}/>
        </div>
        <div className={styles.inputCon}>
          <Link to="/member/profile/updateName" className={styles.links}>
            <label>Name: </label>
            <input className={styles.inputs} disabled></input>
            <MdArrowForwardIos className={styles.inputIcons}/>
          </Link>
        </div>
        <div className={styles.inputCon}>
          <label>Birthday: </label>
          <input className={styles.inputs} disabled></input>
          <MdArrowForwardIos className={styles.inputIcons}/>
        </div>
        <div className={styles.inputCon}>
          <label>Gender: </label>
          <input className={styles.inputs} disabled></input>
          <MdArrowForwardIos className={styles.inputIcons}/>
        </div>
      </div>
    </div>
  )
}

export default ProfileInfo
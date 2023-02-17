import React, {useContext, useState, useEffect} from 'react'
import {UserContext} from "../../../../index";
import styles from "./ProfilePage.module.css";
import AvatarUpload from './AvatarUpload';
import { MdModeEdit, MdArrowForwardIos } from "react-icons/md";
import { doc, setDoc, collection, addDoc, updateDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import EditForm from './EditForm';
import { db } from '../../../firebase-config';

function ProfileInfo() {
  const { authUser, userSignOut, avatarURL, profiles } = useContext(UserContext);
  const [email, setEmail] = useState(authUser? authUser.email : "");
  // const [wouldUpdate, setWouldUpdate] = useState("");
  const [showEditForm, setShowEditForm] = useState(false)
  const shouldShowNameForm = showEditForm;
  console.log(profiles)
  // const profileData = {
  //   avatarURL: avatarURL,
  //   email: authUser.email,
  //   gender: profiles.gender,
  //   name: wouldUpdate
  // }
  // const setUpdateInfo = (string) => {
  //   setWouldUpdate(string)
  // }
  // console.log(wouldUpdate)
  // const updateProfile = (e, ref) => {
  //   const updatedRef = doc(db, ref.uid, "profiles");
  //   e.preventdefault()
  //   setDoc(
  //     updatedRef,
  //     {
  //       name: 123
  //     },
  //     { merge:true }
  //   ).then(docRef => {
  //     console.log("Document Field has been updated successfully");
  //   }).catch(error => {
  //     console.log(error);
  //   })
  // }
  const formActions = (action) => {
    if (!action) {
      setShowEditForm(false)
    }
  }

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
        <div className={styles.inputCon} onClick={() => setShowEditForm(true)}>
            <label>Name: </label>
            <input className={styles.inputs} disabled value={profiles.name}></input>
            <MdArrowForwardIos className={styles.inputIcons}/>
        </div>
        <div className={styles.inputCon}>
          <label>Birthday: </label>
          <input className={styles.inputs} disabled value={profiles.birth}></input>
          <MdArrowForwardIos className={styles.inputIcons}/>
        </div>
        <div className={styles.inputCon}>
          <label>Gender: </label>
          <input className={styles.inputs} disabled value={profiles.gender}></input>
          <MdArrowForwardIos className={styles.inputIcons}/>
        </div>
      </div>
      {shouldShowNameForm && <EditForm formActions={formActions} type="text" ShouldShow={showEditForm} LabelName="Name"
      ></EditForm>}
    </div>
  )
}

export default ProfileInfo
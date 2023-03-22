import React, { useState, useContext } from 'react'
import ReactDOM from 'react-dom';
import styles from "./EditForm.module.css";
import { IoMdClose } from "react-icons/io";
import { db } from '../../../firebase-config';
import { UserContext } from "../../../../index";
import { doc, setDoc, collection, addDoc, updateDoc } from 'firebase/firestore';

function EditForm({LabelName, type, ShouldShow, formActions }) {
  const { authUser, profiles, avatarURL, updateProfiles} = useContext(UserContext);
  const defaultValue = LabelName.toLowerCase();
  const [wouldUpdate, setWouldUpdate] = useState(profiles.name ? profiles.name : "");
  const [date, setDate] = useState(profiles.birth ? profiles.birth : "");
  const [gender, setGender] = useState(profiles.gender ? profiles.gender : "");
  const updatedColumnName = LabelName.toLowerCase();

  const profileData = {
    ...profiles,
    name: wouldUpdate,
    birth: date,
    gender: gender,
  }


  const updateProfile = (e) => {
    const updatedRef = doc(db, "users", `${authUser.uid}`);
    e.preventDefault();
    setDoc(updatedRef,
      {Profiles:profileData},
    ).then(docRef => {
      updateProfiles(profileData);
      console.log("Document Field has been updated successfully");
      formActions();
      setWouldUpdate("");
      setDate("");
      setGender("");
    }).catch(error => {
      console.log(error);
    })
  }
    if (!ShouldShow) return null
      return ReactDOM.createPortal(
        <div className={styles.background}>
            <form className={styles.form}>
                <div className={styles.closeBtn} onClick={() => formActions()}><IoMdClose className={styles.closeIcon}></IoMdClose></div>
                <div className={styles.firstCon}>
                  <label className={styles.labels}>Name</label>
                  <input 
                  className={styles.inputs} 
                  type={type}
                  onChange={(e) => {
                    setWouldUpdate(e.target.value)
                  }}
                  value={wouldUpdate}
                  ></input>
                </div>
                <div className={styles.firstCon}>
                  <label className={styles.labels}>Date</label>
                  <input 
                  className={styles.inputs} 
                  type="date"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value)
                  }}
                  ></input>
                </div>
                <div className={styles.firstCon}>
                  <label className={styles.labels}>Gender</label>
                  <select className={styles.inputs} value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Non-binary</option>
                  </select>
                </div>
                <div className={styles.submitBtnCon}>
                <button className={styles.submitBtn} onClick={(e) => updateProfile(e)} type="submit">Submit</button>
                </div>
            </form>
        </div>,
        document.getElementById("FormPortal")
      )
}

export default EditForm
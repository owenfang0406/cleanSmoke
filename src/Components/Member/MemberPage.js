import React, {useContext} from 'react'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import {UserContext} from "../../index";
import SignOut from '../SignOut/SignOut'
import styles from "./MemberPage.module.css";
import ProfileBtn from './MemberPageBtns/ProfileBtn';
import BookingBtn from './MemberPageBtns/BookingBtn';
import BookMarkBtn from './MemberPageBtns/BookMarkBtn';
import { Outlet } from 'react-router-dom';


function MemberPage() {
  const { authUser, userSignOut } = useContext(UserContext);
  // console.log(userSignOut)
  // if (authUser) {
  //   console.log(authUser)
  // }
  return (
    <>
    <NavBar/>
    <div className={styles.wrapper}>
      <div className={styles.btnContainer}>
        <div className={styles.btnSubCon}><ProfileBtn></ProfileBtn></div>
        <div className={styles.btnSubCon}><BookingBtn></BookingBtn></div>
        <div className={styles.btnSubCon}><BookMarkBtn></BookMarkBtn></div>
        <div className={styles.btnSubCon}><SignOut></SignOut></div>
      </div>
      <div className={styles.displayArea}>
        <Outlet></Outlet>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default MemberPage
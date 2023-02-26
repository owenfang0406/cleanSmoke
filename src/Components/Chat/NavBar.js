import React from 'react'
import styles from "./ChatRoom.module.css"

function NavBar() {
  return (
    <div className={styles.navbar}>
        <span className={styles.logo}>Chat Room</span>
        <div className={styles.user}>
            <img className={styles.userImg} src="" alt=''></img>
            <span>Owen</span>
            <button className={styles.logOutBtn}>logOut</button>
        </div>
    </div>
  )
}

export default NavBar
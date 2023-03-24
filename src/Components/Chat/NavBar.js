import React, {useContext} from 'react'
import styles from "./ChatRoom.module.css"
import { UserContext } from '../../index'

function NavBar() {
  const { profiles } = useContext(UserContext)
  return (
    <div className={styles.navbar}>
        <span className={styles.logo}>Chat Room</span>
        <div className={styles.user}>
            <img className={styles.userImg} src={profiles.avatarURL} alt=''></img>
            <span className={styles.currentUserName}>{profiles.name}</span>
        </div>
    </div>
  )
}

export default NavBar
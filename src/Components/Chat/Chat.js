import React, { useContext, useState } from 'react'
import styles from "./ChatRoom.module.css"
import { FiTrash2 } from "react-icons/fi"
import { RiContactsLine } from "react-icons/ri"
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../AuthContext/ChatContext'
import { UserContext } from '../../index'

function Chat({ toggleMenu, isMenuOpen }) {
  const { data, user } = useContext(ChatContext);
  const { profiles } = useContext(UserContext);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  // console.log(data.user)
  return (
    <div className={`${styles.chat} ${!isMenuOpen ? styles.chatSlideOut : ""}`}>
      <div className={styles.chatInfo}>
        <RiContactsLine className={styles.chatIcon} onClick={()=>toggleMenu()}></RiContactsLine>
        <span className={styles.chatTheOtherUserName}>{data.user?.displayName}</span>
        <div className={styles.chatIcons}>
          <FiTrash2 className={styles.chatIcon} onClick={()=>setShowDeletePopup(true)}></FiTrash2>
        </div>
      </div>
      <Messages setShowDeletePopup={setShowDeletePopup} showDeletePopup={showDeletePopup}></Messages>
      <Input></Input>
    </div>
  )
}

export default Chat
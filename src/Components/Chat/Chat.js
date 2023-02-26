import React, { useContext } from 'react'
import styles from "./ChatRoom.module.css"
import { FiTrash2 } from "react-icons/fi"
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../AuthContext/ChatContext'
import { UserContext } from '../../index'

function Chat() {
  const { data, user } = useContext(ChatContext)
  const { profiles } = useContext(UserContext);
  console.log(data.user)
  return (
    <div className={styles.chat}>
      <div className={styles.chatInfo}>
        <span>{data.user?.displayName}</span>
        <div className={styles.chatIcons}>
          <FiTrash2 className={styles.chatIcon}></FiTrash2>
        </div>
      </div>
      <Messages></Messages>
      <Input></Input>
    </div>
  )
}

export default Chat
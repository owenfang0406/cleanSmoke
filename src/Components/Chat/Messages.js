import React, {useContext, useEffect, useState} from 'react'
import styles from "./ChatRoom.module.css"
import Message from './Message'
import { ChatContext } from '../AuthContext/ChatContext'
import { onSnapshot, doc } from 'firebase/firestore'
import { db } from '../firebase-config'

function Messages() {
  const [messages, setMessages] = useState([])
  const { data } = useContext(ChatContext)

 console.log(data)
  useEffect(() => {
    let unSub
    if(data.chatId) {
      unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
        if(doc.exists()) {
        console.log(doc.data().messages)
        setMessages(doc.data().messages)
        console.log(messages)
        }
      })

    }

      return () => {
        if(unSub) {
          unSub()
        }
      }
  },[data.chatID])

  return (
    <div
    className={styles.messages}
    >
      {messages && messages.map((message) => (
        <Message key={message.id} message={message}></Message>
      ))}
    </div>
  )
}

export default Messages
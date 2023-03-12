import React, {useContext, useEffect, useState} from 'react'
import styles from "./ChatRoom.module.css"
import Message from './Message'
import { ChatContext } from '../AuthContext/ChatContext'
import { onSnapshot, doc, deleteDoc, deleteField, updateDoc } from 'firebase/firestore'
import { db } from '../firebase-config'
import DeleteDialog from './DeleteDialog'
import { UserContext } from '../../index'

function Messages({ setShowDeletePopup, showDeletePopup }) {
  const { profiles } = useContext(UserContext)
  const [messages, setMessages] = useState([])
  const { data, dispatch } = useContext(ChatContext)
  const Disclaimer = "Your chat history will be permanently deleted, Are you going to proceed?"
  const [ isDeleting, setIsDeleting] = useState(false)
  // console.log(data)
 
  const DeleteChatHistory = async() => {
    if(!isDeleting){
      setIsDeleting(true)
      await Promise.all([
        deleteDoc(doc(db, 'chats', data.chatId)),
        updateDoc(doc(db, 'UserChats', data.user.uid), {
          [data.chatId]: deleteField()
        }),
        updateDoc(doc(db, 'UserChats', profiles.uid), {
          [data.chatId]: deleteField()
        }),
      ]);
      setIsDeleting(false);
      dispatch({type:"RESET"})
      setMessages([])
      // setMessages([]);
    }
  }

//  console.log(data)
//  console.log(messages)
  useEffect(() => {
    let unSub
    if(data.chatId) {
      unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
        if(doc.exists()) {
        // console.log(doc.data().messages)
        setMessages(()=>doc.data().messages)
        // console.log(messages)
        }
      })

    }
      return () => {
        if(unSub) {
          unSub()
        }
      }
  },[data.chatId])

  return (
    <div
    className={styles.messages}
    >
      {showDeletePopup && <DeleteDialog Disclaimer={Disclaimer} DeleteChatHistory={DeleteChatHistory} setShowDeletePopup={setShowDeletePopup}></DeleteDialog>}
      {messages && messages.map((message) => (
        <Message key={message.id} message={message}></Message>
      ))}
    </div>
  )
}

export default Messages
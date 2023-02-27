import React, {useContext, useEffect, useState} from 'react'
import styles from "./ChatRoom.module.css"
import {IoMdAttach} from "react-icons/io"
import {BiImageAdd} from "react-icons/bi"
import { UserContext } from '../../index'
import { ChatContext } from '../AuthContext/ChatContext'
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc, setDoc} from 'firebase/firestore'
import { db } from '../firebase-config'
import { v4 as uuid } from 'uuid'


function Input() {
  const [text, setText] = useState("")
  const [img, setImg] = useState(null)
  const { profiles } = useContext(UserContext)
  const { data } = useContext(ChatContext)


  useEffect(() => {
    if(data) {
      console.log(data)
    }
  },[data])

  const handleSend = async(event) => {
      if(data.chatId) {
        console.log(data.chatId)
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: profiles.uid,
            data: Timestamp.now(),
          })
        }) 
        await setDoc(doc(db, "UserChats", profiles.uid), {
          [data.chatId]: {
            lastMessage: {
              text,
            }
          },
            date: serverTimestamp(),
        },{ merge: true })

        await setDoc(doc(db, "UserChats", data.user.uid), {
          [data.chatId]: {
            lastMessage: {
              text,
            }
          },
  
          date: serverTimestamp(),
        },{ merge: true })

        setText("")
      }
  }
  return (
    <div className={styles.chattingInputCon}>
        <input type="text" placeholder="Type something" value={text} className={styles.typingArea} onChange={e => setText(e.target.value)}></input>
        <div className={styles.sendIconCon}>
            <IoMdAttach></IoMdAttach>
            <input type="file" style={{display:"none"}} className={styles.fileSelector} id="file" onChange={(e) => setImg(e.target.files[0])}></input>
            <label htmlFor='file'>
            <BiImageAdd></BiImageAdd>
            </label>
            <button className={styles.sendBtn} onClick={(e) =>handleSend(e)}>Send</button>
        </div>
    </div>
  )
}

export default Input
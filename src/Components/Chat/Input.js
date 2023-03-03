import React, {useContext, useEffect, useState} from 'react'
import styles from "./ChatRoom.module.css"
import {IoMdAttach} from "react-icons/io"
import {BiImageAdd} from "react-icons/bi"
import { UserContext } from '../../index'
import { ChatContext } from '../AuthContext/ChatContext'
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc, setDoc} from 'firebase/firestore'
import { db, storage } from '../firebase-config'
import { v4 as uuid, v4 } from 'uuid'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'


function Input() {
  const [text, setText] = useState("")
  const [img, setImg] = useState(null)
  const { profiles } = useContext(UserContext)
  const { data } = useContext(ChatContext)


  const handleKeyDown = (e) => {
    if(e.code === "Enter") {
      e.preventDefault();
      handleSend();
    } 
  }

  useEffect(() => {
    if(data) {
      console.log(data)
    }
  },[data])

  const handleSend = async() => {
      const messageUid = v4();
      let ImgURL;
      if(data.chatId) {
        console.log("0")
        const sendImg = async(URL) => {
          updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: messageUid,
            text,
            senderId: profiles.uid,
            data: Timestamp.now(),
            img:URL,
          })
        })};

        if (img) {
          console.log("1")
          const ImgStorageRef = ref(storage, `chatting/${data.chatId}/images/${messageUid}`)
          uploadBytes(ImgStorageRef, img).then((snapshot) => {
            console.log("uploaded!")
            console.log(snapshot)
            getDownloadURL(snapshot.ref).then((downloadURL) => {
              ImgURL = downloadURL
              console.log(downloadURL)              
              sendImg(downloadURL);
              setImg(null)
              setText("")
            }).catch((err) => {
              console.error(err)
            })

          }).catch((err) => {
            console.error(err)
          })
          }
        else {
        console.log("2")
        console.log(data.chatId)
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: messageUid,
            text,
            senderId: profiles.uid,
            data: Timestamp.now(),
          })
        }) 
        await setDoc(doc(db, "UserChats", profiles.uid), {
          [data.chatId]: {
            lastMessage: {text},
            date: serverTimestamp(),
          },
        },{ merge: true })

        await setDoc(doc(db, "UserChats", data.user.uid), {
          [data.chatId]: {
            lastMessage: {text},
            date: serverTimestamp(),
          },
        },{ merge: true })

        setText("")
      }
      }else {
        console.log("Chat ID not found");
      }
  }
  return (
    <div className={styles.chattingInputCon}>
        <input type="text" placeholder="Type something" value={text} onKeyDown={(e)=> handleKeyDown(e)} className={styles.typingArea} onChange={e => setText(e.target.value)}></input>
        <div className={styles.sendIconCon}>
            {/* <IoMdAttach></IoMdAttach> */}
            <input type="file" accept="image/png, image/gif, image/jpeg" style={{display:"none"}} className={styles.fileSelector} id="file" onChange={(e) => setImg(e.target.files[0])}></input>
            <label htmlFor='file'>
            <BiImageAdd></BiImageAdd>
            </label>
            <button className={styles.sendBtn} onClick={() => handleSend()}>Send</button>
        </div>
    </div>
  )
}

export default Input
import { onSnapshot, doc } from 'firebase/firestore'
import React, { useEffect, useState, useContext } from 'react'
import { db } from '../firebase-config'
import styles from "./ChatRoom.module.css"
import { UserContext } from "../../index";
import { ChatContext } from '../AuthContext/ChatContext';

function Chats() {
    const { profiles } = useContext(UserContext);
    const { dispatch } = useContext(ChatContext);
    const[chats, setChats] = useState([]);

    useEffect(() => {
        let unsubscribe;
        if (profiles.uid) {
        const userChatsRef = doc(db, "UserChats", profiles.uid);
          unsubscribe = onSnapshot(userChatsRef, (doc) => {
            setChats(doc.data());
          });
        }
      
        return () => {
          if (unsubscribe) {
            unsubscribe();
          }
        };

    }, [profiles])

    const handleSelect = (u) => {
        dispatch({type:"CHANGE_USER", payload: u})
    }
    return (
        <div className={styles.chats}>
          {chats && Object.entries(chats)?.sort((a,b) => b[1]?.date - a[1]?.date).map((chat) => (
            chat[1] && chat[1].TheOtherUserInfo && (
              <div key={chat[0]} className={styles.userChat} onClick={() => handleSelect(chat[1].TheOtherUserInfo)}>
                <img className={styles.userChatImg} src={chat[1].TheOtherUserInfo.avatarURL} alt=''></img>
                <div className={styles.userChatInfo}>
                  <span className={styles.userChatInfoName}>{chat[1].TheOtherUserInfo.displayName}</span>
                  <p className={styles.userChatInfoMsg}>{chat[1].lastMessage?.text}</p>
                </div>
              </div>
            )
          ))}
        </div>
      );      
}

export default Chats
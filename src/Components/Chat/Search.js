import React, { useState, useContext } from 'react'
import styles from "./ChatRoom.module.css"
import { db } from "../firebase-config"
import { collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where, getDoc } from 'firebase/firestore'
import { UserContext } from "../../index";

function Search() {
  const [username, setUsername] = useState("")
  const [user, setUser] = useState("")
  const [err, setErr] = useState(false)
  const { profiles } = useContext(UserContext);
  const handleSearch = async() => {
    const q = query(collection(db, 'users'), where("Profiles.name", "==", username))

    try {
      const queryResults = await getDocs(q)
      queryResults.forEach((doc) => {
        console.log(doc.data())
        setUser(doc.data().Profiles)
      })
    }catch(err) {
      console.log(err)
      setErr(true)
    }
  }
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  }

  const handleSelect = async() => {
    //check whether the group exists
    console.log(user)
    const combinedID = profiles.uid > user.uid ? profiles.uid + user.uid : user.uid + profiles.uid;
    console.log(combinedID)
    try {
      const res = await getDoc(doc(db, "chats", combinedID));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedID), {
          messages: []
        })

        await setDoc(doc(db, "UserChats", user.uid), {
          [combinedID]:{ 
            TheOtherUserInfo:{
            uid: profiles.uid,
            displayName: profiles.name,
            avatarURL: profiles.avatarURL
          },
          date: serverTimestamp()
          },
        },{ merge: true })

        await setDoc(doc(db, "UserChats", profiles.uid), {
          [combinedID]:{ 
            TheOtherUserInfo:{
            uid: user.uid,
            displayName: user.name,
            avatarURL: user.avatarURL
          },
          date: serverTimestamp()
          },
        },{ merge: true })
      }
    }catch(err) {
      console.log(err)
    }

    setUser(null);
    setUsername("");
    //create userChats for both
  }
  return (
    <div className={styles.search}>
        <div className={styles.searchForm}>
            <input className={styles.searchFormInput} type="text"
             placeholder='find a user'
             onKeyDown={handleKey}
             onChange={(e) => setUsername(e.target.value)}
             value={username}
             ></input>
        </div>
        {err && <span>User not found!</span>}
        {user && <div className={styles.userChat} onClick={handleSelect}>
            <img className={styles.userChatImg} src={user.avatarURL} alt=''></img>
            <div className={styles.userChatInfo}>
                <span>{user.name}</span>
            </div>
        </div>}
    </div>
  )
}

export default Search
import React, { useState, useContext, useRef, useEffect } from 'react'
import styles from "./ChatRoom.module.css"
import { db } from "../firebase-config"
import { collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where, getDoc } from 'firebase/firestore'
import { UserContext } from "../../index";

function Search() {
  const [username, setUsername] = useState("")
  const [user, setUser] = useState([])
  const [err, setErr] = useState(false)
  const { profiles } = useContext(UserContext);
  const [showUserQuery, setShowUserQuery] = useState(false);
  const searchRef = useRef();


  const handleSearch = async(e) => {
    setShowUserQuery(true)
    setUsername(()=>e.target.value)
    // const q = query(collection(db, 'users'), where("Profiles.name", "==", e.target.value))
    const q = query(
      collection(db, "users"),
      where("Profiles.name", ">=", e.target.value),
      where("Profiles.name", "<=", e.target.value + "\uf8ff")
    );
    
    try {
      setUser([]);
      // console.log(=username)
      const queryResults = await getDocs(q)
      queryResults.forEach((doc) => {
        // console.log(doc.data())
        setUser((prev) => [...prev, doc.data().Profiles])
      })
    }catch(err) {
      console.log(err)
      setErr(true)
    }
  }
  // const handleKey = (e) => {
  //   e.code == "ENTER" && handleSearch();
  // }

  const handleSelect = async(user) => {
    //check whether the group exists
    // console.log(user)
    const combinedID = profiles.uid > user.uid ? profiles.uid + user.uid : user.uid + profiles.uid;
    // console.log(combinedID)
    try {
      const res = await getDoc(doc(db, "chats", combinedID));
      const res2 = await getDoc(doc(db, "UserChats", profiles.uid))
      const res3 = await getDoc(doc(db, "UserChats", user.uid))
      if (!res.exists() || !res2.exists() || !res3.exists()) {
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
            lastMessage:{
              text:"",
            },
            date: serverTimestamp(),
          },
        },{ merge: true })

        await setDoc(doc(db, "UserChats", profiles.uid), {
          [combinedID]:{ 
            TheOtherUserInfo:{
            uid: user.uid,
            displayName: user.name,
            avatarURL: user.avatarURL
            },
            lastMessage:{
              text:"",
            },
            date: serverTimestamp()
          },
        },{ merge: true })
      }
    }catch(err) {
      console.log(err)
    }

    setUser([]);
    setUsername("");
    setShowUserQuery(false);
    //create userChats for both
  }

  // console.log(profiles.uid)
  const handleClickOutside = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      if (e.target.classList.contains(styles.searchFormInput)) {
        setShowUserQuery(true);
      } else {
        setShowUserQuery(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div ref={searchRef} className={styles.search}>
        <div className={styles.searchForm}>
            <input className={styles.searchFormInput} type="text"
             placeholder='find a user'
            //  onKeyDown={handleKey}
             onChange={(e) => {
              handleSearch(e);
            }}
             value={username}
             ></input>
        </div>
        <div>
        {err && <span>User not found!</span>}
        </div>
        {showUserQuery && <div className={styles.userQueryCon}>
          {user && user.map((user) => 
              (<div className={styles.userQueryUserChat} onClick={
                ()=>{
                handleSelect(user)}
                }
                key={user.uid}
                >
              <img className={styles.userQueryUserChatImg} src={user.avatarURL} alt=''></img>
              <div className={styles.userQueryUserChatInfo}>
                  <span>{user.name}</span>
              </div>
          </div>))}
        </div>}
    </div>
  )
}

export default Search
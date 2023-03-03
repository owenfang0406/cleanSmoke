import React from 'react'
import NavBar from '../Components/NavBar/NavBar'
import Footer from '../Components/Footer/Footer'
import Comments from "../Components/AD/Comment/Comments"
import Sidebar from "../Components/Chat/SideBar"
import Chat from "../Components/Chat/Chat"
import styles from "./ChatRoom.module.css"

function ChatRoom() {
  return (
    <>
    <NavBar></NavBar>
    <div className={styles.home}>
      <div className={styles.container}>
        <Sidebar></Sidebar>
        <Chat></Chat>
      </div>
    </div>
    <Footer></Footer>
    </>
  )
}

export default ChatRoom
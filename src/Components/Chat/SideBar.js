import React from 'react'
import styles from "./ChatRoom.module.css"
import NavBar from './NavBar'
import Search from './Search'
import Chats from './Chats'

function SideBar() {
  return (
    <div className={styles.sidebar}>
        <NavBar></NavBar>
        <Search></Search>
        <Chats></Chats>
    </div>
  )
}

export default SideBar
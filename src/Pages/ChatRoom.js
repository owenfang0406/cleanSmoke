import React, { useState, useEffect} from 'react'
import NavBar from '../Components/NavBar/NavBar'
import Footer from '../Components/Footer/Footer'
import Comments from "../Components/AD/Comment/Comments"
import Sidebar from "../Components/Chat/SideBar"
import Chat from "../Components/Chat/Chat"
import styles from "./ChatRoom.module.css"
import BottomBar from '../Components/NavBar/BottomBar'
import { useMediaQuery } from 'react-responsive';

function ChatRoom() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const isSmall = useMediaQuery({maxWidth: 700});

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
    <NavBar></NavBar>
    <div className={styles.home}>
      <div className={styles.container}>
        <Sidebar isMenuOpen={isMenuOpen}></Sidebar>
        <Chat isMenuOpen={isMenuOpen} toggleMenu={toggleMenu}></Chat>
      </div>
    </div>
    <BottomBar></BottomBar>
    {!isSmall && <Footer></Footer>}
    </>
  )
}

export default ChatRoom
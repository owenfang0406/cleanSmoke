import React, { useState, useEffect} from 'react'
import NavBar from '../Components/NavBar/NavBar'
import Footer from '../Components/Footer/Footer'
import Comments from "../Components/AD/Comment/Comments"
import Sidebar from "../Components/Chat/SideBar"
import Chat from "../Components/Chat/Chat"
import styles from "./ChatRoom.module.css"

function ChatRoom() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  // const [isResizing, setIsResizing] = useState(false)
  // const [lastX, setLastX] = useState(null)
  // const [leftWidth, setLeftWidth] = useState(300)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // const handleMouseDown = (event) => {
  //   setIsResizing(true)
  //   setLastX(event.clientX)
  // }
  // const handleMouseUp = () => {
  //   setIsResizing(false);
  // };

  // const handleMouseMove = (event) => {
  //   if (!isResizing) {
  //     return;
  //   }

  //   const deltaX = event.clientX - lastX;
  //   setLastX(event.clientX);
  //   setLeftWidth((prevLeftWidth) => prevLeftWidth + deltaX);
  // };


  // useEffect(() => {
  //   const handleResize = () => {
  //     const windowWidth = window.innerWidth;

  //     if (windowWidth < 768) {
  //       setIsMenuOpen(false);
  //     } else {
  //       setIsMenuOpen(true);
  //     }
  //   };

  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  return (
    <>
    <NavBar></NavBar>
    <div className={styles.home}>
      <div className={styles.container}>
        <Sidebar isMenuOpen={isMenuOpen}></Sidebar>
        <Chat isMenuOpen={isMenuOpen} toggleMenu={toggleMenu}></Chat>
      </div>
    </div>
    <Footer></Footer>
    </>
  )
}

export default ChatRoom
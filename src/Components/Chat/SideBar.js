import React, {useState} from 'react'
import styles from "./ChatRoom.module.css"
import NavBar from './NavBar'
import Search from './Search'
import Chats from './Chats'

function SideBar({isMenuOpen}) {
  // const [isResizing, setIsResizing] = useState(false)
  // const [lastX, setLastX] = useState(null)
  // const [leftWidth, setLeftWidth] = useState(300)

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

  return (
    <div 
    className={`${styles.sidebar} ${isMenuOpen ? styles.slideIn : ''}`}
      // onMouseDown={handleMouseDown}
      // onMouseUp={handleMouseUp}
      // onMouseMove={handleMouseMove}
    >
        <div className={styles.topSideBar}>
        <NavBar></NavBar>
        <Search></Search>
        </div>
        <div className={styles.chatRoom}>
          <Chats></Chats>
          {/* <Search></Search> */}
        </div>
    </div>
  )
}

export default SideBar
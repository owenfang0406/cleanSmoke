import React from 'react'
import styles from "./buttons.module.css"
import { MdOutlineBookmark } from "react-icons/md";
import { Link } from 'react-router-dom';

function BookMarkBtn() {
    return (
        <Link to="/member/SavedPosts" className={styles.links}><MdOutlineBookmark className={styles.Btn}></MdOutlineBookmark></Link>
      )
}

export default BookMarkBtn
import React from 'react'
import styles from "./ChatRoom.module.css"
import { IoMdClose } from "react-icons/io"

function DeleteDialog({ Disclaimer, setShowDeletePopup, DeleteChatHistory }) {
    const proceedToDelete = () => {
        DeleteChatHistory();
        setShowDeletePopup(false);
    }
  return (
    <div className={styles.DeletePopUpCon}>
        <IoMdClose className={styles.closeBtn} onClick={() => setShowDeletePopup(false)}></IoMdClose>
        <div className={styles.disclaimerCon}>{Disclaimer}</div>
        <div className={styles.DeletePopUpBtnCon}>
            <button className={styles.ConfirmBtn} onClick={proceedToDelete}>Yes</button>
            <button className={styles.ConfirmBtn} onClick={() => setShowDeletePopup(false)}>No</button>
        </div>
    </div>
  )
}

export default DeleteDialog
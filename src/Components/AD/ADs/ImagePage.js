import React from 'react'
import styles from "./MasonryGallery.module.css";
import { BiChevronLeft, BiChevronRight } from"react-icons/bi";
import { IoMdClose } from "react-icons/io";

function ImagePage({ open, onClose, imgAction, data}) {
    if(!open) return null
  return (
    <div 
    className={styles.mainCon}>
      <div className={styles.imgCon}>
        <IoMdClose className={styles.closeBtn} onClick={() => imgAction()}></IoMdClose>
        <BiChevronLeft className={styles.arrows} onClick={() => imgAction('previous-img')}>↼</BiChevronLeft>
        <img src={data.img} className={styles.imgs}>
        </img>
        <BiChevronRight className={styles.arrows} onClick={() => imgAction('next-img')}></BiChevronRight>
      </div>
      <div className={styles.commentCon}>

      </div>
    </div>
  )
}

export default ImagePage
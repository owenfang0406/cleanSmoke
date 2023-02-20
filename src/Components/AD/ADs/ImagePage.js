import React from 'react'
import styles from "./MasonryGallery.module.css";
import ReactDOM from 'react-dom';
import { BiChevronLeft, BiChevronRight } from"react-icons/bi";
import { IoMdClose } from "react-icons/io";
import Post from './Post';

function ImagePage({ open, onClose, imgAction, data}) {
    if(!open) return null
  return ReactDOM.createPortal (
    <div 
    className={styles.mainCon}>
      <div className={styles.imgCon}>
        {/* <IoMdClose className={styles.closeBtn} onClick={() => imgAction()}></IoMdClose>
        <BiChevronLeft className={styles.arrows} onClick={() => imgAction('previous-img')}>↼</BiChevronLeft>
        <img src={data.img} className={styles.imgs}>
        </img>
        <BiChevronRight className={styles.arrows} onClick={() => imgAction('next-img')}></BiChevronRight> */}
      <Post
      img={data.img}
      ></Post>
      </div>
    </div>,
    document.getElementById("ImgPortal")
  )
}

export default ImagePage
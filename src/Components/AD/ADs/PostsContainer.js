import React, {useEffect, useRef, useState} from 'react'
import styles from "./MasonryGallery.module.css";
import ReactDOM from 'react-dom';
import { MdClose } from 'react-icons/md';
import { BiChevronLeft, BiChevronRight } from"react-icons/bi";
import { IoMdClose } from "react-icons/io";
import Post from './Post';

function PostsContainer({ posts, open, setOpen, clickedImgID }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);
  const postToShow = posts.find((post) => post.id === clickedImgID)

  const handleScroll = (event) => {
    setScrollPosition(event.target.scrollTop);
    console.log(event)
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  useEffect(() => {
    if(clickedImgID) {
      console.log(postToShow)
      // const ele = document.getElementById(clickedImgID)
      // ele.scrollIntoView({ behavior: 'smooth' });
    }
  }, [clickedImgID])


    if(!open) return null
  return ReactDOM.createPortal (
    <div 
    className={styles.mainCon}
    onScroll={(e)=>handleScroll(e)} ref={containerRef}
    >
      <MdClose
      className={styles.closeBtn}
      onClick={()=>setOpen(false)}></MdClose>
      <div className={`${styles.imgCon} overflow-y-scroll overflow-hidden`}>
        {postToShow && <Post
          key={postToShow.id}
          id={postToShow.id}
          photographer={postToShow.data().photographer}
          username = {postToShow.data().username}
          userImg = {postToShow.data().profileImg}
          img={postToShow.data().image}
          caption={postToShow.data().caption}
          ></Post>}
      </div>
    </div>,
    document.getElementById("ImgPortal")
  )
}

export default PostsContainer
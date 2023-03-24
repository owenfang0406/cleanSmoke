import React, {useEffect, useRef, useState} from 'react'
import styles from "./MasonryGallery.module.css";
import ReactDOM from 'react-dom';
import { MdClose } from 'react-icons/md';
import Post from './Post';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase-config';
import { getDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function PostsContainer({ posts, open, setOpen, clickedImgID }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [postToShow, setPostToShow] = useState(null);
  const containerRef = useRef(null);
  const { ID } = useParams();
  const navigate = useNavigate()

  const handleScroll = (event) => {
    setScrollPosition(event.target.scrollTop);
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
    if (clickedImgID) {
      const post = posts.find((post) => post.id === clickedImgID);
      setPostToShow(post);
    } else if (ID) {
      getDoc(doc(db, "posts", ID))
        .then((doc) => {
          if (doc.exists) {
            setOpen(true)
            setPostToShow(doc);
          } else {
            console.log("No such post found");
          }
        })
        .catch((error) => {
          console.log("Error getting post:", error);
        });
    }
  }, [clickedImgID, ID, posts]);


    if(!open) return null
  return ReactDOM.createPortal (
    <div 
    className={styles.mainCon}
    onScroll={(e)=>handleScroll(e)} ref={containerRef}
    >
      <MdClose
      className={styles.closeBtn}
      onClick={()=> {
        navigate("/gallery")
        setOpen(false)}}></MdClose>
      <div className={`${styles.imgCon} overflow-y-scroll overflow-hidden`}>
        {postToShow && <Post
          key={postToShow.id}
          id={postToShow.id}
          photographer={postToShow.data()?.photographer}
          username = {postToShow.data()?.username}
          userImg = {postToShow.data()?.profileImg}
          img={postToShow.data()?.image}
          caption={postToShow.data()?.caption}
          postOwnerId={postToShow.data()?.uid}
          ></Post>}
      </div>
    </div>,
    document.getElementById("ImgPortal")
  )
}

export default PostsContainer
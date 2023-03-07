import React, { useEffect, useState } from 'react'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import styles from "./MasonryGallery.module.css";
import styled from '@emotion/styled'
import { BiChevronLeft, BiChevronRight } from"react-icons/bi";
import { IoMdClose } from "react-icons/io";
import PostsContainer from './PostsContainer';
import PostModal from './PostModal';
import { db } from '../../firebase-config';
import { collection, onSnapshot, orderBy, query, getDocs } from 'firebase/firestore';

// const ArrowLeft = styled.div`
//   width: 30px;
//   height: 30px;
//   color: white;
//   border-radius: 5px;
// `

function MasonryGallery() {
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([])
  const [collectionPosts, setCollectionPosts] = useState([])
  const [clickedImgID, setClickedImgID] = useState("")

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), snapshot => {
      setPosts(snapshot.docs)
    })

    const fetchPosts = async () => {
      const docsSnapshot = await getDocs(collection(db, "posts"))
      docsSnapshot.forEach((doc) => {
        const PostObject = {
          PostId: doc.id,
          Post: doc.data()
        }
        setCollectionPosts((prev) => [...prev, PostObject])
        console.log(doc.id, " => ", doc.data());
      })
    }
    fetchPosts();

    return () => {
      unsubscribe()
    }
  }, [db])

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const docsSnapshot = await getDocs(collection(db, "posts"))
  //     docsSnapshot.forEach((doc) => {
  //       console.log(doc.id, " => ", doc.data());
  //     })
  //   }
  //   fetchPosts();
  // }, [])


  const showImgPage = (image, i) => {
    setOpen(true);
    setClickedImgID(i)
    // console.log(clickedImgID)
    // console.log(collectionPosts)
    // const postToShow = collectionPosts.find((post) => post.PostId === "XMw4bDMtnWpRNWRH4vxS")
    // console.log(postToShow)
  }

  
    return (

      <>
        {
          <PostsContainer
          posts={posts}
          open={open} 
          setOpen={setOpen}
          onClose={() => setOpen(false)} 
          clickedImgID={clickedImgID}
          ></PostsContainer>
        }
        <div className={styles.wrapper}>
          <ResponsiveMasonry
              columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
          >
              <Masonry gutter='20px'>
                  {posts && posts.map((post) => (
                      <img
                          key={post.id}
                          src={post.data().image}
                          style={{width: "100%", display: "block", cursor: "pointer"}}
                          alt=""
                          onClick={()=> showImgPage(post.image, post.id)}/>
                  ))}
              </Masonry>
          </ResponsiveMasonry>
        </div>
      </>
    )
}

export default MasonryGallery
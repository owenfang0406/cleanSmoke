import React, { useEffect, useState } from 'react'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import styles from "./MasonryGallery.module.css";
import PostsContainer from './PostsContainer';
import { db } from '../../firebase-config';
import { collection, onSnapshot, orderBy, query, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


function MasonryGallery() {
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([])
  const [collectionPosts, setCollectionPosts] = useState([])
  const [clickedImgID, setClickedImgID] = useState("")
  const navigate = useNavigate()

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
      })
    }
    fetchPosts();

    return () => {
      unsubscribe()
    }
  }, [db])



  const showImgPage = (image, i) => {
    setOpen(true);
    setClickedImgID(i);
    navigate(`/gallery/${i}`);
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
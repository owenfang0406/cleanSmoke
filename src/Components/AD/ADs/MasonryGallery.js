import React, { useEffect, useState, useRef } from "react"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import styles from "./MasonryGallery.module.css"
import PostsContainer from "./PostsContainer"
import { db } from "../../firebase-config"
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  getDocs,
  limit,
  startAfter,
} from "firebase/firestore"
import useThrottle from "./useThrottle"
import { useNavigate } from "react-router-dom"

function MasonryGallery() {
  const [open, setOpen] = useState(false)
  const [posts, setPosts] = useState([])
  const [collectionPosts, setCollectionPosts] = useState([])
  const [clickedImgID, setClickedImgID] = useState("")
  const navigate = useNavigate()
  const containerRef = useRef(null)
  const [observer, setObserver] = useState(null)

  const fetchMore = async () => {
    const q = query(
      collection(db, "posts"),
      orderBy("timestamp", "desc"),
      limit(6),
      startAfter(posts[Math.max(0, posts.length - 1)])
    )

    const querySnapshot = await getDocs(q)
    if (querySnapshot.docs.length === 0) {
      return
    }
    querySnapshot.forEach((doc) => {
      setPosts((prev) => [...prev, doc])
    })
  }

  const throttleFetchMore = useThrottle(fetchMore, 3000)
  const cards = window.document.querySelector("#card")

  useEffect(() => {
    const lastCard = window.document.querySelector("#card:last-child")
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    }

    const io = new IntersectionObserver((entries) => {
      const lastCard = entries[0]
      if (!lastCard.isIntersecting) return

      io.unobserve(lastCard.target)
      throttleFetchMore()
    }, options)

    if (lastCard != null) {
      io.observe(lastCard)
    }
  }, [posts.length])

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc"), limit(9)),
      (snapshot) => {
        setPosts(snapshot.docs)
      }
    )

    const fetchPosts = async () => {
      const docsSnapshot = await getDocs(collection(db, "posts"))
      docsSnapshot.forEach((doc) => {
        const PostObject = {
          PostId: doc.id,
          Post: doc.data(),
        }
        setCollectionPosts((prev) => [...prev, PostObject])
      })
    }
    fetchPosts()

    return () => {
      unsubscribe()
    }
  }, [db])

  const showImgPage = (image, i) => {
    setOpen(true)
    setClickedImgID(i)
    navigate(`/gallery/${i}`)
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
      <div className={styles.wrapper} ref={containerRef}>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry gutter="20px">
            {posts &&
              posts.map((post) => (
                <img
                  id="card"
                  key={post.id}
                  src={post.data().image}
                  className={styles.card}
                  alt=""
                  onClick={() => showImgPage(post.image, post.id)}
                />
              ))}
          </Masonry>
          {/* <button onClick={fetchMore}>Load</button> */}
        </ResponsiveMasonry>
      </div>
    </>
  )
}

export default MasonryGallery

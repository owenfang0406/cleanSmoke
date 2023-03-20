import { collection, getDoc, getDocs, listCollections, query as firestoreQuery, where, orderBy, onSnapshot } from 'firebase/firestore'
import React, {useEffect, useContext, useState} from 'react'
import { db } from '../firebase-config'
import { UserContext } from '../../index';
import SavedPost from './SavedPost';

function BookMark() {
    const [savedPostsId, setSavedPostsId] = useState(new Set());
    const { profiles } = useContext(UserContext)
    const [posts, setPosts] = useState([])
    const [collectionPosts, setCollectionPosts] = useState([])
    const [savedPosts, setSavedPosts] = useState([])
  
    useEffect(() => {
      const unsubscribe = onSnapshot(firestoreQuery(collection(db, 'posts'), orderBy('timestamp', 'desc')), snapshot => {
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

    const fetchLikedPosts = async () => {
        const queryAllPosts = await getDocs(collection(db, "posts"));
        for (const doc of queryAllPosts.docs) {
          const subCollection = collection(db, "posts", doc.id, "marks");
          const query = firestoreQuery(subCollection, where("username", "==", profiles.uid));
          const querySnapshot = await getDocs(query);
          if (!querySnapshot.empty) {
            setSavedPostsId((savedPostsID) => new Set([...savedPostsID, doc.id]));
          }
        }
      };

    useEffect(()=> {
        fetchLikedPosts();
    }, [])

    useEffect(() => {
        const savedPostsData = collectionPosts.filter(post =>
            savedPostsId.has(post.PostId)
          );
          setSavedPosts(savedPostsData);
    }, [collectionPosts, savedPostsId])

    // if (!savedPosts.length) {
    //     return <div>Loading...</div>
    //   }

    const removeSavedPost = (Id) => {
        // console.log(savedPosts)
        setSavedPosts(savedPosts.filter(post => post.PostId !== Id))
        setSavedPostsId(savedPostsID => {
            const newSet = new Set(savedPostsID);
            newSet.delete(Id)
            return newSet;
        });
        // console.log(savedPosts)
    };

  return (
    <div className="flex flex-col items-center pb-60">
        {savedPosts && savedPosts.map((post) => (
            <SavedPost
              removeSavedPost={() => removeSavedPost(post.PostId)}
              key={post.id}
              id={post.PostId}
              username = {post.Post.username}
              userImg = {post.Post.profileImg}
              img={post.Post.image}
              caption={post.Post.caption}
              postOwnerId={post.Post.uid}
            ></SavedPost>
        ))}
    </div>
  )
}

export default BookMark
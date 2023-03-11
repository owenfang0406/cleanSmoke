import React, { useContext, useState, useEffect } from 'react'
import {UserContext} from "../../../index";
import { BsThreeDots, BsCamera2 } from "react-icons/bs"
import { HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconFilled } from '@heroicons/react/24/solid'
import { BookmarkIcon as BookmarkIconFilled } from '@heroicons/react/24/solid'
import { PaperAirplaneIcon, ChatBubbleOvalLeftEllipsisIcon, BookmarkIcon, FaceSmileIcon } from '@heroicons/react/24/outline'
import { addDoc, collection, serverTimestamp, onSnapshot, query, orderBy, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import Moment from 'react-moment';

function Post({username, photographer, img, id, userImg, caption}) {
   const { authUser, userSignOut, avatarURL, profiles, setPostModalOpen, postModalOpen, toggleModal } = useContext(UserContext);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);
    const [marks, setMarks] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);
    const [hasSaved, setHasSaved] = useState(false);

    const sendComment = async(e) => {
        e.preventDefault();

        const commentToSend = comment;
        setComment("");

        await addDoc(collection(db, 'posts', id, 'comments'), {
            comment: commentToSend,
            username: profiles.name,
            userImg: profiles.avatarURL,
            timestamp: serverTimestamp(),
        })
    }

    const likePost = async () => {
        console.log(hasLiked)
        if (hasLiked) {
            await deleteDoc(doc(db, 'posts', id, 'likes', authUser.uid))
        } else {
            await setDoc(doc(db, 'posts', id, 'likes', authUser.uid), {
                username: authUser.uid,
            })        
        }
    }

    const savePost = async () => {
        if (hasSaved) {
            await deleteDoc(doc(db, 'posts', id, 'marks', authUser.uid))
        } else {
            await setDoc(doc(db, 'posts', id, 'marks', authUser.uid), {
                username: authUser.uid,
            })
        }
    }

    useEffect(() => {
        return onSnapshot(query(
            collection(db, 'posts', id, 'comments'), 
            orderBy('timestamp', 'desc')
            ), 
        (snapshot) => {
            setComments(snapshot.docs)
        })
    },[db, id])

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'posts', id, 'marks'), snapshot => {
            setMarks(snapshot.docs)
        })

        return () => {
            unsubscribe();
        }
    }, [db, id])

    useEffect(() => {
        setHasSaved(
            marks.findIndex((mark) => mark.id === authUser?.uid) != -1);
    }, [marks])

    useEffect(() => {
        setHasLiked(
            likes.findIndex((like) => like.id === authUser?.uid) !== -1);
    }, [likes])


    useEffect(() => {
       const unsubscribe = onSnapshot(collection(db, 'posts', id, 'likes'), snapshot => {
        setLikes(snapshot.docs)
        })

        return () => {
            unsubscribe();
        }
    }, [db, id])
 
  return (
    <>
    <div className="bg-white my-0 border scrollbar-none rounded-sm w-full h-full overflow-scroll md:w-[50%] md:my-7"
    id={id}
    >     <div className='flex flex-wrap'>
            <div className="flex items-center p-5 w-full h-[10%]">
                {photographer && <BsCamera2 className="h-5 w-5 mr-2"></BsCamera2>}
                <img src={userImg}
                className="rounded-full object-cover h-12 w-12 border p-1 mr-3"
                ></img>
                <p className="flex-1 font-bold">{username}</p>
                <BsThreeDots className="h-5"></BsThreeDots>
            </div>

            <div className="w-full h-[40%]">
                <img src={img} className="object-contain w-full h-full max-w-full max-h-full"></img>
            </div>
        </div>

        <div className="w-full bg-white h-[30%] md:w-[40%] md:hidden">
            {authUser && (<div className="flex justify-between px-4 pt-4">
                <div className="flex space-x-4">
                    {
                        hasLiked ? (<HeartIconFilled onClick={likePost} className="btn text-red-500"></HeartIconFilled>) 
                        : (<HeartIcon onClick={likePost} className="btn"></HeartIcon>)
                    }
                    <PaperAirplaneIcon className="btn"></PaperAirplaneIcon>
                    {/* <ChatBubbleOvalLeftEllipsisIcon className="btn"></ChatBubbleOvalLeftEllipsisIcon> */}
                </div>
                { hasSaved ? (<BookmarkIconFilled className="btn" onClick={savePost}></BookmarkIconFilled>) 
                : (<BookmarkIcon className="btn" onClick={savePost}></BookmarkIcon>) }
            </div>)}


            <p className="p-5 truncate">
                <span className='font-bold mr-1'>{username} </span>
                {caption}
            </p>

            {comments.length > 0 && (
                    <div className="ml-5 h-20 overflow-y-scroll
                    scrollbar-thumb-black scrollbar-thin" >
                        {comments.map((comment) => (
                        <div   
                            key={comment.id}
                            className="flex mt-2 items-center space-x-2 mb-3"
                            >
                            <img 
                            className="h-7 w-7 rounded-full"
                            src={comment.data().userImg}>
                            </img>
                            <p
                            className="text-sm flex-1"
                            ><span className="font-bold">{comment.data().username}</span>{" "}{comment.data().comment}</p>
                            <Moment fromNow className="pr-5 text-xs">
                                {comment.data().timestamp?.toDate()}
                            </Moment>
                        </div>))}
                    </div>
            )}

        {authUser && (<form className="flex items-center p-4 overflow-y-scroll">
                {/* <FaceSmileIcon className="h-7"></FaceSmileIcon> */}
                <img className="h-7 w-7 rounded-full" src={profiles.avatarURL}></img>
                <input type="text" 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder='Add a comment...'
                className="border-none flex-1 focus:ring-0 outline-none"></input>
                <button 
                type='submit'
                disabled={!comment.trim()}
                onClick={(e) => sendComment(e)}
                className="font-semibold text-blue-400 cursor-pointer"
                >Post</button>
            </form>)}
        </div>
    </div>
        <div className="hidden md:w-[40%] md:block bg-white h-full w-full">
            {authUser && (<div className="flex justify-between px-4 pt-4">
                <div className="flex space-x-4">
                    {
                        hasLiked ? (<HeartIconFilled onClick={likePost} className="btn text-red-500"></HeartIconFilled>) 
                        : (<HeartIcon onClick={likePost} className="btn"></HeartIcon>)
                    }
                    <PaperAirplaneIcon className="btn"></PaperAirplaneIcon>
                    {/* <ChatBubbleOvalLeftEllipsisIcon className="btn"></ChatBubbleOvalLeftEllipsisIcon> */}
                </div>
                { hasSaved ? (<BookmarkIconFilled className="btn" onClick={savePost}></BookmarkIconFilled>) 
                : (<BookmarkIcon className="btn" onClick={savePost}></BookmarkIcon>) }
            </div>)}


            <p className="p-5 truncate">
                <span className='font-bold mr-1'>{username} </span>
                {caption}
            </p>

            {comments.length > 0 && (
                    <div className="ml-5 h-20 overflow-y-scroll
                    scrollbar-thumb-black scrollbar-thin" >
                        {comments.map((comment) => (
                        <div   
                            key={comment.id}
                            className="flex mt-2 items-center space-x-2 mb-3"
                            >
                            <img 
                            className="h-7 w-7 rounded-full"
                            src={comment.data().userImg}>
                            </img>
                            <p
                            className="text-sm flex-1"
                            ><span className="font-bold">{comment.data().username}</span>{" "}{comment.data().comment}</p>
                            <Moment fromNow className="pr-5 text-xs">
                                {comment.data().timestamp?.toDate()}
                            </Moment>
                        </div>))}
                    </div>
            )}

        {authUser && (<form className="flex items-center p-4 overflow-y-scroll">
                <img className="h-9 w-9 rounded-full" src={profiles.avatarURL}></img>
                <input type="text" 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder='Add a comment...'
                className="border-none flex-1 focus:ring-0 outline-none"></input>
                <button 
                type='submit'
                disabled={!comment.trim()}
                onClick={(e) => sendComment(e)}
                className="font-semibold text-blue-400 cursor-pointer"
                >Post</button>
            </form>)}
        </div>
    </>

// </div>
  )
}

export default Post
import React, { useContext } from 'react'
import {UserContext} from "../../../index";
import { BsThreeDots } from "react-icons/bs"
import { HeartIcon } from '@heroicons/react/24/solid'
import { PaperAirplaneIcon, ChatBubbleOvalLeftEllipsisIcon, BookmarkIcon, FaceSmileIcon } from '@heroicons/react/24/outline'

function Post({img}) {
   const { authUser, userSignOut, avatarURL, profiles, setPostModalOpen, postModalOpen, toggleModal } = useContext(UserContext);
  return (
    <div className="bg-white my-7 border rounded-sm w-full h-full overflow-scroll">  
        <div className="flex items-center p-5 w-full h-[10%]">
            <img src={avatarURL}
            className="rounded-full object-cover h-12 w-12 border p-1 mr-3"
            ></img>
            <p className="flex-1 font-bold">{profiles.name}</p>
            <BsThreeDots className="h-5"></BsThreeDots>
        </div>

        <div className="w-full h-[40%]">
            <img src={img} className="object-contain w-full h-full max-w-full max-h-full"></img>
        </div>

        <div className="flex justify-between px-4 pt-4">
            <div className="flex space-x-4">
                <HeartIcon className="btn"></HeartIcon>
                <PaperAirplaneIcon className="btn"></PaperAirplaneIcon>
                <ChatBubbleOvalLeftEllipsisIcon className="btn"></ChatBubbleOvalLeftEllipsisIcon>
            </div>
            <BookmarkIcon className="btn"></BookmarkIcon>
        </div>

        <p className="p-5 truncate">
            <span className='font-bold mr-1'>{profiles.name} </span>
            {/* {caption} */}
        </p>

        <form className="flex items-center p-4 overflow-y-scroll">
            <FaceSmileIcon className="h-7"></FaceSmileIcon>
            <input type="text" 
            placeholder='Add a comment...'
            className="border-none flex-1 focus:ring-0 outline-none"></input>
            <button className="font-semibold text-blue-400">Post</button>
        </form>

</div>
  )
}

export default Post
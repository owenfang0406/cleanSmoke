import React, {useContext, useEffect, useState, useRef} from 'react'
import { UserContext } from '../../index'
import { ChatContext } from '../AuthContext/ChatContext'
import "./Message.scss"
import Moment from 'react-moment'
import 'moment-timezone';

function Message({message}) {
  console.log(message)
  const { profiles } = useContext(UserContext)
  const { data } = useContext(ChatContext)
  const ref = useRef();

  const unixTimestamp = message.data.toMillis()/1000;


  useEffect(() => {
    ref.current?.scrollIntoView({behavior:"smooth", block: 'nearest'})
  }, [message])

  return (
    <div 
    className={`message ${message.senderId === profiles.uid && "owner"}`}>
        <div ref={ref} className="messageInfo">
            <img className="messageInfoAvatar"
            src={message.senderId === profiles.uid ? profiles.avatarURL : data.user.avatarURL}
            alt=""
            ></img>
            <Moment unix fromNow>{unixTimestamp}</Moment>
        </div>
        <div className="messageContent">
            <p className="">{message.text}</p>
            {message.img && <img
            src={message.img}
            alt=""
            ></img>}
        </div>
    </div>
  )
}

export default Message


// function Message({ type }) {
//     const isOwner = type === "owner";
    
//     return (
//       <div className={`${styles.message} ${isOwner ? styles.owner : styles.recipient}`}>
//           <div className={styles.messageInfo}>
//               <img className={styles.messageInfoAvatar} src="" alt="" />
//               <span>just now</span>
//           </div>
//           <div className={`${styles.messageContent} ${isOwner ? styles.ownerMessageContent : styles.recipientMessageContent}`}>
//               <p className={`${styles.messageContentBox} ${isOwner ? styles.ownerMessageContentBox : styles.recipientMessageContentBox}`}>hello</p>
//               <img className={styles.messageContentImg} src="" alt="" />
//           </div>
//       </div>
//     );
//   }
  
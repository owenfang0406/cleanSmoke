import React, {useContext, useEffect, useState, useRef} from 'react'
import { UserContext } from '../../index'
import { ChatContext } from '../AuthContext/ChatContext'
import "./Message.scss"
import Moment from 'react-moment'
import 'moment-timezone';
import styles from "./ChatRoom.module.css"

function Message({message}) {
  const { profiles } = useContext(UserContext);
  const { data } = useContext(ChatContext);
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
            <Moment className={styles.MsgTime} unix fromNow>{unixTimestamp}</Moment>
        </div>
        <div className="messageContent">
            <p className={styles.msgText}>{message.text}</p>
            {message.img && <img
            src={message.img}
            alt=""
            ></img>}
        </div>
    </div>
  )
}

export default Message
  
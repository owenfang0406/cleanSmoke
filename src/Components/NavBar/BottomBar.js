import {FaBars, FaTimes} from "react-icons/fa";
import { MdAddCircleOutline } from "react-icons/md";
import { TbMessageCircle } from "react-icons/tb";
import "../../Styles/main.css"
import styles from "./BottomBar.module.css";
import { Link } from "react-router-dom";
import LogInButton from "../LogIn/LogInButton";
import {UserContext} from "../../index";
import React, { useRef, useState, useContext } from 'react'
import { useMediaQuery } from 'react-responsive';

function BottomBar() {
  const { setPostModalOpen, authUser } = useContext(UserContext);
  const navRef = useRef();
  const isSmall = useMediaQuery({maxWidth: 700});
  const [isClicked, setIsClicked] = useState(false);

  const wrapperClass = `${styles.wrapper} ${isSmall ? '' : styles.hide}`;

  return (
    <div className={wrapperClass}>
      <div className="flex w-full justify-between items-center bg-white-300 cursor-pointer">
        {authUser ? (
          <>
            <Link to="/gallery">
              <MdAddCircleOutline 
                onClick={() => setPostModalOpen(true)}
                className="w-[50px] text-4xl"
              />
            </Link>
            <Link to="/chatting">
              <TbMessageCircle
                className="w-[50px] text-4xl"
              />
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">
              <MdAddCircleOutline 
                className="w-[50px] text-4xl"
              />
            </Link>
            <Link to="/login">
              <TbMessageCircle
                className="w-[50px] text-4xl"
              />
            </Link>
          </>
        )}
        <LogInButton />
      </div>
    </div>
  );
}

export default BottomBar;

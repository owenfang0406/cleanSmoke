import {FaBars, FaTimes} from "react-icons/fa";
import { MdAddCircleOutline } from "react-icons/md";
import { TbMessageCircle } from "react-icons/tb";
import { useMediaQuery } from 'react-responsive';
import "../../Styles/main.css"
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import LogInButton from "../LogIn/LogInButton";
import {UserContext} from "../../index";
import React, { useRef, useState, useContext, useEffect } from 'react'

function NavBar() {
    const { setPostModalOpen, authUser} = useContext(UserContext);
    const navRef = useRef();
    const isSmall = useMediaQuery({maxWidth: 700});
    const [isClicked, setIsClicked] = useState(false);
    const [shouldShowNavbar, setShouldShowNavbar] = useState(true)
    const showNavBar = () => {
        setIsClicked(!isClicked);
    }

    const hideNavbar = () => {
        setIsClicked(!isClicked);
    }
    

    useEffect(() => {
        let prevScrollPos = window.pageYOffset;
        const handleScroll = () => {
          const currentScrollPos = window.pageYOffset;
          setShouldShowNavbar(prevScrollPos > currentScrollPos || currentScrollPos < 50);
          prevScrollPos = currentScrollPos;
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);
      
    const responsiveNavBar = isClicked ? [styles.responsive_nav,] : [];
    const shouldChangeNav = isSmall ? [styles.smallHeaderNav,] : [styles.header,];
    const nav =[styles.nav]

    return(
        <header className={`${styles.header} ${shouldShowNavbar ? styles.fixedNav : styles.hidden}`}>
            <Link to="/">
                <div className={styles.LogoContainer}>
                        <img className={styles.LogoImg} src={require("./Logo.png")} alt="清煙"></img>
                </div>
            </Link>
            <nav className={[...responsiveNavBar, ...shouldChangeNav, ...nav].join(' ')}  ref={navRef} onClick={hideNavbar}>
                <Link className={isSmall ? `${styles.NavAnchor} ${styles.smallNavAnchor}` : `${styles.NavAnchor }`} to="/">Home</Link>
                <Link className={isSmall ? `${styles.NavAnchor} ${styles.smallNavAnchor}` : `${styles.NavAnchor }`} to="/gallery" >Gallery</Link>
                {/* <Link className={isSmall ? `${styles.NavAnchor} ${styles.smallNavAnchor}` : `${styles.NavAnchor }`} to="/chatting">Chats</Link> */}
                <Link className={isSmall ? `${styles.NavAnchor} ${styles.smallNavAnchor}` : `${styles.NavAnchor }`} to="/appoint">Appoint</Link>
                <button className={isSmall ? `${styles.smallNavCloseBtn} ${styles.navBtn} ${styles.smallNavBtn}` : `${styles.smallNavCloseBtn} ${styles.navBtn}`} onClick={showNavBar}>
                    <FaTimes></FaTimes>
                </button>
            </nav>
            <div className={styles.iconCon}>
            <button className={isSmall ? `${styles.navBtn} ${styles.smallNavBtn}` : `${styles.navBtn}`} onClick={showNavBar}>
                <FaBars></FaBars>
            </button>
            {!isSmall && <div className="flex w-[150px] justify-between items-center bg-white-300 cursor-pointer">
                {authUser ? (
                    <>
                        <Link to="/gallery">
                            <MdAddCircleOutline 
                            onClick={() => setPostModalOpen(true)}
                            className="w-[50px] text-4xl">
                            </MdAddCircleOutline>
                        </Link>
                            <Link to="/chatting">
                            <TbMessageCircle
                            className="w-[50px] text-4xl"
                            ></TbMessageCircle>
                        </Link>
                    </>
                    ) : (
                        <>
                        <Link to="/login">
                        <MdAddCircleOutline 
                        className="w-[50px] text-4xl">
                        </MdAddCircleOutline>
                        </Link>
                        <Link to="/login">
                        <TbMessageCircle
                        className="w-[50px] text-4xl"
                        ></TbMessageCircle>
                        </Link>
                        </>
                ) }
                
                <LogInButton></LogInButton>
            </div>}
            </div>
        </header>
    );
}

export default NavBar;
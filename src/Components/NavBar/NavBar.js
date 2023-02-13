import {FaBars, FaTimes} from "react-icons/fa";
import { useMediaQuery } from 'react-responsive';
import { useRef, useState } from "react";
import "../../Styles/main.css"
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import LogInButton from "../LogIn/LogInButton";

function NavBar() {
    const navRef = useRef();
    const isSmall = useMediaQuery({maxWidth: 1000});
    const [isClicked, setIsClicked] = useState(false);

    const showNavBar = () => {
        // navRef.current.classList.toggle("responsive_nav");
        setIsClicked(!isClicked);
    }

    const hideNavbar =()=>{
        // navRef.current.classList.remove("responsive_nav");
        setIsClicked(!isClicked);
    }
    
    const LogoPath = "./Logo.png"

    const responsiveNavBar = isClicked ? [styles.responsive_nav,] : [];
    const shouldChangeNav = isSmall ? [styles.smallHeaderNav,] : [styles.header,];

    return(
        <header className={isSmall ? `${styles.header}` : `${styles.header}`} >
            <Link to="/">
                <div className={styles.LogoContainer}>
                        <img className={styles.LogoImg} src={require("./Logo.png")} alt="清煙"></img>
                </div>
            </Link>
            <nav className={[...responsiveNavBar, ...shouldChangeNav].join(' ')}  ref={navRef} onClick={hideNavbar}>
                <Link className={isSmall ? `${styles.NavAnchor} ${styles.smallNavAnchor}` : `${styles.NavAnchor }`} to="/">Home</Link>
                <Link className={isSmall ? `${styles.NavAnchor} ${styles.smallNavAnchor}` : `${styles.NavAnchor }`} to="/gallery" >Gallery</Link>
                <Link className={isSmall ? `${styles.NavAnchor} ${styles.smallNavAnchor}` : `${styles.NavAnchor }`} to="/about">About</Link>
                <Link className={isSmall ? `${styles.NavAnchor} ${styles.smallNavAnchor}` : `${styles.NavAnchor }`} to="/">Appoint</Link>
                <button className={isSmall ? `${styles.smallNavCloseBtn} ${styles.navBtn} ${styles.smallNavBtn}` : `${styles.smallNavCloseBtn} ${styles.navBtn}`} onClick={showNavBar}>
                    <FaTimes></FaTimes>
                </button>
            </nav>
            <div className={styles.iconCon}>
            <button className={isSmall ? `${styles.navBtn} ${styles.smallNavBtn}` : `${styles.navBtn}`} onClick={showNavBar}>
                <FaBars></FaBars>
            </button>
            <LogInButton></LogInButton>
            </div>
        </header>
    );
}

export default NavBar;
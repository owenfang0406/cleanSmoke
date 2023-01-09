import {FaBars, FaTimes} from "react-icons/fa";
import { useRef } from "react";
import "../Styles/main.css"

function NavBar() {
    const navRef = useRef();

    const showNavBar = () => {
        navRef.current.classList.toggle("responsive_nav");
    }

    const hideNavbar =()=>{
        navRef.current.classList.remove("responsive_nav")
    }

    const LogoPath = "./Logo.png"

    return(
        <header>
            <div className="LogoContainer"><img src={require("./Logo.png")} alt="清煙"></img> </div>
            <nav ref={navRef} onClick={hideNavbar}>
                <a href="/">Home</a>
                <a href="/">Gallery</a>
                <a href="/">About</a>
                <a href="/">Appoint</a>
                <button className="nav-btn nav-close-btn" onClick={showNavBar}>
                    <FaTimes></FaTimes>
                </button>
            </nav>
            <button className="nav-btn" onClick={showNavBar}>
                <FaBars></FaBars>
            </button>
        </header>
    );
}

export default NavBar;
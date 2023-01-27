import React from 'react';
import {FaFacebookSquare, FaTwitterSquare, FaInstagramSquare} from "react-icons/fa";
import styles from "./Footer.module.css";
import "../../Styles/main.css";


function Footer() {
  return (
    <footer className={styles.Footer}>
        <div className={styles.FooterContainer}>
            <div className={styles.CopyRight}>COPYRIGHT © 2023 ClearSmoke</div>
            <div className={styles.IconContainer}>
            <a href="https://www.google.com"><FaInstagramSquare className={styles.Icon}></FaInstagramSquare></a>
            <a href="https://www.google.com"><FaFacebookSquare className={styles.Icon}></FaFacebookSquare></a>
            <a href="https://www.google.com"><FaTwitterSquare className={styles.Icon}></FaTwitterSquare></a>
            </div>
        </div>
    </footer>
  )
}

export default Footer
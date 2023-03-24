import React from 'react';
import styles from "./Footer.module.css";
import "../../Styles/main.css";


function Footer() {
  return (
    <footer className={styles.Footer}>
        <div className={styles.FooterContainer}>
            <div className={styles.CopyRight}>COPYRIGHT © 2023 ClearSmoke</div>
            <div className={styles.IconContainer}>
            </div>
        </div>
    </footer>
  )
}

export default Footer
import React from 'react'
import styles from "./Showcase.module.css";


function IndexShowcase({parentWidth}) {
  return (
    <div className={styles.container}>
        <div className={styles.imgContainer}>
            <img className={`${styles.imgs} ${styles.offset1}`} src={require("./One.jpg")}></img>
        </div>
        <div className={ `${styles.imgContainer}`}>
            <img className={`${styles.imgs} ${styles.offset2}`} src={require("./Three.jpg")}></img>
        </div>
    </div>
  )
}

export default IndexShowcase
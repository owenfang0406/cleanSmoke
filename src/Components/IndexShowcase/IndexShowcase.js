import React from 'react'
import styles from "./Showcase.module.css";


function IndexShowcase({parentWidth}) {
  return (
    <div className={styles.container}>
        <div className={styles.imgContainer}>
            <img className={styles.imgs}  src={require("./One.jpg")}></img>
        </div>
        <div className={styles.imgContainer}>
            <img className={styles.imgs} src={require("./Two.jpg")}></img>
        </div>
    </div>
  )
}

export default IndexShowcase
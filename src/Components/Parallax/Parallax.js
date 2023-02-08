import React from 'react'
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import styles from "./parallax.module.css"

function ParallaxDisplay() {

  return (
    <div>
      <Parallax pages={2} style={{ top: '0', left: '0'}}>
        <ParallaxLayer offset={0} speed={0.25} className={styles.animation}>
          <div className={`${styles.animation_layer} ${styles.parallax} ${styles.mountainView}`} id="mountainView"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.5} className={styles.animation}>
          <div className={`${styles.animation_layer} ${styles.parallax} ${styles.splash}`} id="splash"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={2.5} className={styles.animation}>
          <div className={`${styles.animation_layer} ${styles.parallax}`} id="grass"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.35} className={styles.animation}>
          <div className={`${styles.animation_layer} ${styles.parallax} ${styles.photographer}`} id="photographer"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={2.5} className={styles.animation}>
          <div className={`${styles.animation_layer} ${styles.parallax}`} id=""></div>
        </ParallaxLayer>
      </Parallax>
    </div>
  )
}

export default ParallaxDisplay
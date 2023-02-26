import React from 'react'
import styles from "./CSSParallax.module.css";
import PricingMenu from '../AD/Pricing/PricingMenu';

function CSSParallax() {
  return (
    <div className={`${styles.wrapper} scrollbar-none`}>
        <header className={styles.header}>
            {/* <div className={styles.slogan1}>Appoint Now</div> */}
            <img src={require("./parallaxImgs/splash.png")} className={styles.background}></img>
            <img src={require("./parallaxImgs/lense.png")} className={styles.foreground}></img>
            <h1 className={styles.title}>Your Memories, Our Passion.<br/>
            <span>Get Started Now</span></h1>
        </header>
        <section className={styles.section}>
        <PricingMenu></PricingMenu>
        </section>
    </div>
  )
}

export default CSSParallax
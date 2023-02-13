import React from 'react'
import styles from "./CSSParallax.module.css";
import PricingMenu from '../AD/Pricing/PricingMenu';

function CSSParallax() {
  return (
    <div className={styles.wrapper}>
        <header className={styles.header}>
            <img src={require("./parallaxImgs/splash.png")} className={styles.background}></img>
            <img src={require("./parallaxImgs/lense.png")} className={styles.foreground}></img>
            <h1 className={styles.title}>Welcome!</h1>
        </header>
        <section className={styles.section}>
        <PricingMenu></PricingMenu>
        </section>
    </div>
  )
}

export default CSSParallax
import React from 'react';
import styles from "./buttons.module.css"
import { Link } from 'react-router-dom';
import { MdShoppingCart } from "react-icons/md";

function BookingBtn() {
  return (
    <Link to="/member/booking" className={styles.links}><MdShoppingCart className={styles.Btn}></MdShoppingCart></Link>
  )
}

export default BookingBtn
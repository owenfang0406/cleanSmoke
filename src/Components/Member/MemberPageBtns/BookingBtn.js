import React from 'react';
import styles from "./buttons.module.css"
import { Link } from 'react-router-dom';

function BookingBtn() {
  return (
    <Link to="/member/booking" className={styles.links}><div className={styles.Btn}>Booking</div></Link>
  )
}

export default BookingBtn
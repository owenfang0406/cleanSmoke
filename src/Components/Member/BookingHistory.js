import React, { useContext, useState} from 'react'
import {UserContext} from "../../index";
import styles from "./BookingHistory.module.css"

function BookingHistory() {
    const { orders} = useContext(UserContext)
    console.log(orders)
    const rows = orders.map((order, index) => {
        return (<tr key={index} className={styles.trs}>
            <td className={styles.tds}>{order.Date}</td>
            <td className={styles.tds}>{order.Option}</td>
            <td className={styles.tds}>{order.Price}</td>
            <td className={styles.tds}>{order.Participants}</td>
        </tr>)
    })
  return (
    <div className={styles.wrapper}>
      <table className={styles.tableCon}>
        <thead>
          <td className={styles.tdHeader}>Date</td>
          <td className={styles.tdHeader}>Option</td>
          <td className={styles.tdHeader}>Price</td>
          <td className={styles.tdHeader}>Participants</td>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  )
}

export default BookingHistory
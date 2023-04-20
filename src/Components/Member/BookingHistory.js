import React, { useContext, useState} from 'react'
import {UserContext} from "../../index";
import styles from "./BookingHistory.module.css"
import { MdDeleteOutline } from "react-icons/md"
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase-config';
import { Link } from 'react-router-dom';


function BookingHistory() {
    const {orders, profiles, handleRefreshOrders} = useContext(UserContext)
    const [selectedRows, setSelectedRows] = useState([]);
  const toggleDropdown = (ID) => {
      if (selectedRows.includes(ID)) {
        setSelectedRows(selectedRows.filter((rowID) => rowID !== ID))
      } else{
        setSelectedRows([...selectedRows, ID])
      }
    }
  const batchOperation = () => {
    if (selectedRows.length === orders.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(orders.map(( order, index) => order.OrderID));
    }
  };

  const deleteOrder = async(orderId) => {
    const orderRef = doc(db, "users", profiles.uid, "Orders", orderId)
    await deleteDoc(orderRef)
    handleRefreshOrders();
  }
  const emptyNote = () => {
      return (
      <div className={styles.emptyNoteCon}>
        <div className={styles.note1}>No booking history</div>
        <div className={styles.note2}><Link to="/appoint">Click here to make one</Link></div>
      </div>
    )
  }

    const rows = orders.map((order, index) => {
      const isDropdownOpen = selectedRows.includes(order.OrderID);
        return (
        <div key={order.OrderID} className={styles.outerCon}>
          <div className={styles.orderTitle}>{order.Date}</div>
          <div className={styles.showBtn} onClick={() => toggleDropdown(order.OrderID)}>
          {isDropdownOpen ? "-" : "+"}
          </div>
          {isDropdownOpen && 
            <div
            className={`${styles.dropDownCon} ${
              isDropdownOpen ? styles.open : styles.fadeOut
            }`}>
              <MdDeleteOutline 
              onClick={() => deleteOrder(order.OrderID)}
              className={styles.cancelBtn}></MdDeleteOutline>
              <div className={styles.clientInfoCon}>
                <div className={styles.detailRowCon}>
                  <div className={styles.tds}><span>Scheduled Date: </span>{order.Date}</div>
                </div>
                <div className={styles.detailRowCon}>
                  <div className={styles.tds}><span>Selected Option: </span>{order.Option}</div>
                </div>
                <div className={styles.detailRowCon}>
                  <div div className={styles.tds}><span>Price: </span>{order.Price}</div>
                </div>
                <div className={styles.detailRowCon}>
                  <div className={styles.tds}><span>Number of attendants: </span>{order.Participants}</div>
                </div>
              </div>
              <div className={styles.photogInfoCon}> 
                <div className={styles.photogTitle}>
                  <div>Photographer: </div>
                  <div className={styles.photogInfo}>
                    <img className={styles.photogAvatar} src={order.PhotographerData?.avatarURL}></img>
                    <span>{order.PhotographerData?.name}</span>
                  </div>
                </div>
                <div className={styles.detailRowCon}>
                  <div className={styles.tds}><span>Photographer E-mail: </span>{order.PhotographerData?.email}</div>
                </div>
              </div>
          </div>
          }
        </div>)
    })

  return (
    <div className={styles.wrapper}>
      <div className={styles.subWrapper}>
        <div className={styles.batchOperationBtnCon}>
          <button onClick={batchOperation}>
            {selectedRows.length === orders.length ? "Close all" : "Open all"}
          </button>
        </div>
        <div className={styles.historyCon}>
          {orders.length > 0 ? rows : emptyNote() }
        </div>
      </div>
    </div>
  )
}

export default BookingHistory
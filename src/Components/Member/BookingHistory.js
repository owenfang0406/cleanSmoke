import React, { useContext, useState} from 'react'
import {UserContext} from "../../index";

function BookingHistory() {
    const { orders} = useContext(UserContext)
    console.log(orders)
    const orderHistory = orders.map((order, index) => {
        return <div key={index}>{order.Price}</div>
    })
  return (
    <div>
        {orderHistory}
    </div>
  )
}

export default BookingHistory
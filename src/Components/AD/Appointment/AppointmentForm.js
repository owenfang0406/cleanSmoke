import React, { useState, useContext } from 'react'
import styles from "./AppointmentForm.module.css"
import { Link } from 'react-router-dom'
import Pay from '../Pay/Pay';
import { UserContext } from "../../../index";
import { db } from '../../firebase-config';
import { doc, setDoc, collection, addDoc, updateDoc,arrayUnion } from 'firebase/firestore';
import { v4 } from 'uuid';

function AppointmentForm({ selectedOption, shouldShowAppointmentForm, selectedPrice, SetSelectedPrice, setSelectedOption}) {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString());
    const { authUser, profiles, orders } = useContext(UserContext);
    const [phone, setPhone] = useState(null)
    const [showPage1, setShowPage1] = useState(true);
    const [participants, setParticipant] = useState(0);
    const OrderObject = {
        date: selectedDate,
      }
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        SetSelectedPrice(event.target.value);
        console.log(event.target.value);
      }
    const handlePayButtonClick = () => {
        setShowPage1(false);
    }
    const handleBackButtonClick = () => {
        setShowPage1(true);
    }

    const handlePayFormSubmit = (e) => {
        e.preventDefault();
        const OrderID = v4();
        const OrderRef = doc(db,`${authUser.uid}`, "test");
        const OrdersArray = Object.values(orders);
        console.log(orders);
        const OrdersObject = {
            Email: authUser.email,
            Option: selectedOption,
            Phone: phone,
            Participants: participants,
            Price: selectedPrice,
            payment:false,
            }
        ;

        setDoc(OrderRef, {
            Orders: [...OrdersArray, OrdersObject],
        }
        )
        .then(() => {
        alert("success!")
            }
        ).catch((err) => {
            alert(err);
        })};

  return (
    <div className={styles.wrapper}>
        <form className={`${styles.FormCon} ${styles.fadeIn}`}>
            <div className={styles.formHeader}>Your Selection</div>
            <div className={styles.inputCon}>
                <label className={styles.labels}>Your option: </label>
                {/* <select className={styles.selector} value={selectedOption} onChange={handleOptionChange}>
                    <option className={styles.options} value={3000}>Option1</option>
                    <option className={styles.options} value={5000}>Option2</option>
                    <option className={styles.options} value={12000}>Option3</option>
                </select> */}
                <input type="text" className={styles.inputs} value={selectedOption} disabled></input>
            </div>
            <div className={styles.inputCon}>
                <label className={styles.labels}>Date: </label>
                <input 
                className={styles.inputs}
                type="date"
                value={selectedDate.substr(0, 10)}
                onChange={(e) => {setSelectedDate(e.target.value)}}
                ></input>
            </div>
            <div className={styles.inputCon}>
                <label className={styles.labels}>Phone: </label>
                <input className={styles.inputs} type="text"
                onChange={(e) => setPhone(e.target.value)}
                ></input>
            </div>
            <div className={styles.inputCon}>
                <label className={styles.labels}>Participant: </label>
                <input className={styles.inputs} type="number"
                onChange={(e) => setParticipant(e.target.value)}
                ></input>
            </div>
            <div className={styles.inputCon}>
                <label className={styles.labels}>Price: </label>
                <input className={styles.inputs} type="text" value={selectedPrice} disabled></input>
            </div>
            <div className={styles.buttonCon}>
                <button onClick={handlePayFormSubmit} className={styles.submitButton} type='submit'>Pay</button>
            </div>
        </form>
    </div>
  )
}

export default AppointmentForm
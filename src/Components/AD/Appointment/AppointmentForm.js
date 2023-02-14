import React, { useState, useContext } from 'react'
import styles from "./AppointmentForm.module.css"
import { Link } from 'react-router-dom'
import Pay from '../Pay/Pay';
import { UserContext } from "../../../index";
import { db } from '../../firebase-config';
import { doc, setDoc, collection, addDoc, updateDoc } from 'firebase/firestore';
import { v4 } from 'uuid';

function AppointmentForm({ selectedOption, shouldShowAppointmentForm, selectedPrice, SetSelectedPrice, setSelectedOption}) {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString());
    const { authUser, profiles } = useContext(UserContext);
    const [phone, setPhone] = useState(null)
    const [showPage1, setShowPage1] = useState(true);
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
    }

  return (
    <div className={styles.wrapper}>
        <form className={`${styles.FormCon} ${styles.fadeIn}`}>
            <div className={styles.formHeader}>Your Selection</div>
            <div className={styles.inputCon}>
                <label className={styles.labels}>Your option: </label>
                <select className={styles.selector} value={selectedOption} onChange={handleOptionChange}>
                    <option className={styles.options} value={3000}>Option1</option>
                    <option className={styles.options} value={5000}>Option2</option>
                    <option className={styles.options} value={12000}>Option3</option>
                </select>
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
                <input className={styles.inputs} type="text"></input>
            </div>
            <div className={styles.inputCon}>
                <label className={styles.labels}>Participant: </label>
                <input className={styles.inputs} type="number"></input>
            </div>
            <div className={styles.inputCon}>
                <label className={styles.labels}>Price: </label>
                <input className={styles.inputs} type="text" value={selectedPrice} readOnly></input>
            </div>
            <div className={styles.buttonCon}>
                <button onClick={handlePayFormSubmit} className={styles.submitButton} type='submit'>Pay</button>
            </div>
        </form>
    </div>
  )
}

export default AppointmentForm
import React, { useEffect, useState } from 'react'
import styles from "./AppointmentForm.module.css"
import { Link } from 'react-router-dom'
import Pay from '../Pay/Pay';

function XAppointmentForm({clickedButton, selectedOption, shouldShowAppointmentForm, setSelectedOption, setClickedButton}) {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString());
    const [showPage1, setShowPage1] = useState(true);
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        setClickedButton(event.target.value);
        console.log(showPage1);
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

    useEffect(() => {
        TPDirect.setupSDK({})        
    })
  return (
    <div className={styles.wrapper}>
        {showPage1 ? (
        <form className={`${styles.FormCon} ${showPage1 ? styles.fadeIn : styles.fadeOut}`}>
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
                <input className={styles.inputs} type="text" value={clickedButton} readOnly></input>
            </div>
            <div className={styles.buttonCon}>
                <button onClick={handlePayButtonClick} className={styles.submitButton} type='submit'>Pay</button>
            </div>
        </form>) :
        (
            <form className={styles.FormCon} onSubmit={handlePayFormSubmit}>
                <div className={styles.formHeader}>Payment Form</div>
                <Pay />
                <div className={styles.buttonCon}>
                <button onClick={handleBackButtonClick} className={styles.submitButton} type='button'>Back</button>
                <button className={styles.submitButton} type='submit'>Submit Payment</button>
                </div>
            </form>
        )}
    </div>
  )
}

export default XAppointmentForm
import React, { useState, useContext, useEffect, useRef } from 'react'
import styles from "./AppointmentForm.module.css"
import { Link } from 'react-router-dom'
import Pay from '../Pay/Pay';
import { UserContext } from "../../../index";
import { db } from '../../firebase-config';
import { doc, setDoc, collection, addDoc, updateDoc, arrayUnion, getDocs, where, query } from 'firebase/firestore';
import { v4 } from 'uuid';
import PayForm from './PayForm';
import { MdOutlineClose } from "react-icons/md";

function AppointmentForm({
    selectedOption,
    selectedPrice, 
    SetSelectedPrice, 
    setSelectedOption,
    toggleAppointmentForm
    }) {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0,10));
    const { authUser, profiles, orders, handleRefreshOrders } = useContext(UserContext);
    const [phone, setPhone] = useState(null);
    const [showPage1, setShowPage1] = useState(true);
    const ShouldShowPage2 = showPage1;
    const [participants, setParticipant] = useState(0);
    const [photographers, setPhotographers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPhotographerId, setSelectedPhotographerId] = useState("");
    const [selectedPhotographer, setSelectedPhotographer] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null)
    const inputRef = useRef(null);
    const [isFormDataValid, setIsFormDataValid] = useState(false);


    useEffect(() => {
        const isNameValid = participants > 0;
        const regex = /^[0-9]{10,}$/;
        const isNumber = regex.test(phone);
        const isPhotographer = selectedPhotographer != null;
        setIsFormDataValid(isNameValid && isNumber && isPhotographer);
      }, [participants, phone, selectedPhotographer]);

    const handleInputFocus = () => {
        setShowDropdown(true);
      };
      
      const handleInputBlur = () => {
        setShowDropdown(false);
      };
    
    const findPhotographer = async () => {
        setPhotographers([]);
        let q = collection(db, "users");
        q = query(q, where("Profiles.photographer", "==", true));
        const querySnapshot = await getDocs(q);
        const photographerData = querySnapshot.docs.map((doc) => doc.data().Profiles);
        setPhotographers(photographerData);
        console.log(photographers)
      };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value)
    }
      
    const filteredPhotographers = photographers.filter((photographer) =>
        photographer.name.toLowerCase().includes(searchTerm.toLowerCase()))

    useEffect(() => {
        findPhotographer();
    }, [])

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          inputRef.current &&!inputRef.current.contains(event.target)
          ) {
            setShowDropdown(false);
          }
        };
      
        document.addEventListener("click", handleClickOutside);
      
        return () => {
          document.removeEventListener("click", handleClickOutside);
        };
      }, [dropdownRef]);

    const handleSelectChange = (photographer, event) => {
        setSelectedPhotographer(photographer);
        setSearchTerm(photographer.name);
        setShowDropdown(false);
        event.stopPropagation()
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

    const goToPayPage = (e) => {
        e.preventDefault();
        setShowPage1(false)
    }

    const handlePayFormSubmit = (e) => {
        e.preventDefault();
        const OrderID = v4();
        const OrderRef = collection(db, "users", `${authUser.uid}`, "Orders");
        const OrdersObject = {
            OrderID: OrderID,
            Date: selectedDate,
            Email: authUser.email,
            Option: selectedOption,
            Phone: phone,
            Participants: participants,
            Price: selectedPrice,
            PhotographerData: selectedPhotographer,
            Payment:false,
            }
        ;

        setDoc(doc(OrderRef, OrderID), {
            Orders: OrdersObject
        }
        )
        .then(() => {
        handleRefreshOrders();
        alert("success!")
        toggleAppointmentForm();
        }
        ).catch((err) => {
            alert(err);
        })};

  return (
    <div className={styles.wrapper}>
        {ShouldShowPage2 ? (
        <form className={`${styles.FormCon} ${styles.fadeIn}`}>
            <div className={styles.formHeader}>Your Selection
            <MdOutlineClose className={styles.closeBtn} onClick={toggleAppointmentForm}></MdOutlineClose>
            </div>
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
                <label>photographer: </label>
                <input 
                onFocus={handleInputFocus}
                // onBlur={handleInputBlur}
                ref={inputRef}
                className={styles.inputs} 
                value={searchTerm} 
                type="text" 
                placeholder='Search Photographer' 
                onChange={(e) => {
                    handleInputChange(e)
                    }}>
                </input>

                {showDropdown && (<div className={styles.searchDropDown}
                ref={dropdownRef}
                >
                    {filteredPhotographers.map((photographer) => (
                        <div 
                        key={photographer.uid} 
                        value={photographer.uid} 
                        className={styles.queryBox}
                        onClick={(e) => handleSelectChange(photographer, e)}
                        >
                            <img src={photographer.avatarURL} className="w-6 h-6 mr-4"></img>
                            <span>{photographer.name}</span>
                        </div>
                    ))}
                </div>)}
            </div>
            <div className={styles.inputCon}>
                <label className={styles.labels}>Phone: </label>
                <input className={styles.inputs} type="text"
                onChange={(e) => {
                    setPhone(e.target.value)}}
                placeholder="Ex 0912345678"
                value={phone}
                ></input>
            </div>
            <div className={styles.inputCon}>
                <label className={styles.labels}>Participant: </label>
                <input className={styles.inputs} type="number"
                value={participants}
                onChange={(e) => {
                    setParticipant(e.target.value)}}
                placeholder="Ex 2"
                ></input>
            </div>
            <div className={styles.inputCon}>
                <label className={styles.labels}>Price: </label>
                <input className={styles.inputs} type="text" value={selectedPrice} disabled></input>
            </div>
            <div className={styles.buttonCon}>
                <button onClick={goToPayPage} className={styles.submitButton} type='button' disabled={!isFormDataValid}>Next</button>
            </div>
        </form>) :
        (
             <form className={styles.confirmFormCon} onSubmit={handlePayFormSubmit}>
                <div className={styles.formHeader}>
                <MdOutlineClose className={styles.closeBtn} onClick={toggleAppointmentForm}></MdOutlineClose>
                </div>
                <div className={styles.dataPreviewCon}>
                    <div className={styles.title}>Your Order Information</div>
                    <div>
                        Option: {selectedOption}
                    </div>
                    <div>
                        Date: {selectedDate}
                    </div>
                    <div>
                        Price: {selectedPrice}
                    </div>
                    <div>
                        Phone Number: {phone}
                    </div>
                    <div>
                        Photographer Name: {selectedPhotographer?.name}
                    </div>
                    <div>
                        Photographer E-mail: {selectedPhotographer?.email}
                    </div>
                </div>
                {/* <div className={styles.checkBox}>
                    <input type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
                    <label htmlFor="checkbox">I have reviewed and agree to the terms and conditions</label>
                </div> */}
                <div className={styles.buttonCon}>
                <button onClick={handleBackButtonClick} className={styles.submitButton} type='button'>Back</button>
                <button className={styles.submitButton} type="submit" >Confirm</button>
                </div>
            </form>
        )}
    </div>
  )
}

export default AppointmentForm
import React, { useState, useContext, useEffect, useRef } from "react"
import styles from "./AppointmentForm.module.css"
import { UserContext } from "../../../index"
import { db } from "../../firebase-config"
import {
  doc,
  setDoc,
  collection,
  getDocs,
  where,
  query,
} from "firebase/firestore"
import { v4 } from "uuid"
import { MdOutlineClose } from "react-icons/md"

function AppointmentForm({
  selectedOption,
  selectedPrice,
  SetSelectedPrice,
  setSelectedOption,
  toggleAppointmentForm,
}) {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  )
  const { authUser, handleRefreshOrders } = useContext(UserContext)
  const [phone, setPhone] = useState(null)
  const [showPage1, setShowPage1] = useState(true)
  const ShouldShowPage2 = showPage1
  const [participants, setParticipant] = useState(0)
  const [photographers, setPhotographers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPhotographer, setSelectedPhotographer] = useState(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)
  const inputRef = useRef(null)
  const [isFormDataValid, setIsFormDataValid] = useState(false)

  useEffect(() => {
    const isNameValid = participants > 0
    const regex = /^[0-9]{10,}$/
    const isNumber = regex.test(phone)
    const isPhotographer = selectedPhotographer != null
    setIsFormDataValid(
      isDateValid(selectedDate) && isNameValid && isNumber && isPhotographer
    )
  }, [participants, phone, selectedPhotographer, selectedDate])

  const isInputValid = (regex) => (inputValue) => {
    return regex.test(inputValue)
  }

  const TodayDateComponent = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, "0")
    const day = String(today.getDate()).padStart(2, "0")
    const formattedDate = `${year}-${month}-${day}`
    return formattedDate
  }

  const numericRegex = /^[0-9]{10,}$/

  const greaterThanZeroRegex = /^(?=.*[1-9])[0-9]+$/

  const isDateValid = (dateStr) => {
    const today = new Date().toISOString().slice(0, 10)
    return dateStr > today
  }

  const handleInputFocus = () => {
    setShowDropdown(true)
  }

  const findPhotographer = async () => {
    setPhotographers([])
    let q = collection(db, "users")
    q = query(q, where("Profiles.photographer", "==", true))
    const querySnapshot = await getDocs(q)
    const photographerData = querySnapshot.docs.map(
      (doc) => doc.data().Profiles
    )
    setPhotographers(photographerData)
  }

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredPhotographers = photographers.filter((photographer) =>
    photographer.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(() => {
    findPhotographer()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [dropdownRef])

  const handleSelectChange = (photographer, event) => {
    setSelectedPhotographer(photographer)
    setSearchTerm(photographer.name)
    // setShowDropdown(!showDropdown);
    event.stopPropagation()
  }

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value)
    SetSelectedPrice(event.target.value)
    // console.log(event.target.value);
  }
  const handlePayButtonClick = () => {
    setShowPage1(false)
  }
  const handleBackButtonClick = () => {
    setShowPage1(true)
  }

  const goToPayPage = (e) => {
    e.preventDefault()
    setShowPage1(false)
  }

  const handlePayFormSubmit = (e) => {
    e.preventDefault()
    const OrderID = v4()
    const OrderRef = collection(db, "users", `${authUser.uid}`, "Orders")
    const OrdersObject = {
      OrderID: OrderID,
      Date: selectedDate,
      Email: authUser.email,
      Option: selectedOption,
      Phone: phone,
      Participants: participants,
      Price: selectedPrice,
      PhotographerData: selectedPhotographer,
      Payment: false,
    }
    setDoc(doc(OrderRef, OrderID), {
      Orders: OrdersObject,
    })
      .then(() => {
        handleRefreshOrders()
        alert("success!")
        toggleAppointmentForm()
      })
      .catch((err) => {
        alert(err)
      })
  }

  return (
    <div className={styles.wrapper}>
      {ShouldShowPage2 ? (
        <form className={`${styles.FormCon} ${styles.fadeIn}`}>
          <div className={styles.formHeader}>
            Your Selection
            <MdOutlineClose
              className={styles.closeBtn}
              onClick={toggleAppointmentForm}
            ></MdOutlineClose>
          </div>
          <div className={styles.inputCon}>
            <label className={styles.labels}>Set: </label>
            <input
              type="text"
              className={styles.inputs}
              value={selectedOption}
              disabled
            ></input>
          </div>
          <div className={styles.inputCon}>
            <label className={styles.labels}>
              Date:
              <input
                className={styles.dateInput}
                type="date"
                value={selectedDate.substr(0, 10)}
                onChange={(e) => {
                  setSelectedDate(e.target.value)
                }}
                min={TodayDateComponent()}
              ></input>
              {isDateValid(selectedDate) ? null : (
                <span className="text-red-700"> *</span>
              )}
            </label>
          </div>
          <div className={styles.inputCon}>
            <label>
              Photographer:
              <input
                onFocus={handleInputFocus}
                // onBlur={handleInputBlur}
                ref={inputRef}
                className={styles.customizedInput}
                value={searchTerm}
                type="text"
                placeholder="Search Photographer"
                onChange={(e) => {
                  handleInputChange(e)
                }}
              ></input>
              {!searchTerm && <span className="text-red-700"> *</span>}
              {showDropdown && (
                <div className={styles.searchDropDown} ref={dropdownRef}>
                  {filteredPhotographers.map((photographer) => (
                    <div
                      key={photographer.uid}
                      value={photographer.uid}
                      className={styles.queryBox}
                      onClick={(e) => {
                        handleSelectChange(photographer, e)
                        inputRef.current.blur()
                        setShowDropdown(false)
                      }}
                    >
                      <img
                        src={photographer.avatarURL}
                        className="w-6 h-6 mr-4 rounded-full"
                      ></img>
                      <span>{photographer.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </label>
          </div>
          <div className={styles.inputCon}>
            <label className={styles.labels}>
              Phone:
              <input
                className={styles.customizedInput}
                type="text"
                onChange={(e) => {
                  setPhone(e.target.value)
                }}
                placeholder="Ex 0912345678"
                value={phone}
              ></input>
              {isInputValid(numericRegex)(phone) ? null : (
                <span className="text-red-700"> *</span>
              )}
            </label>
          </div>
          <div className={styles.inputCon}>
            <label className={styles.labels}>
              Participant:
              <input
                className={styles.customizedInput}
                type="number"
                value={participants}
                onChange={(e) => {
                  setParticipant(e.target.value)
                }}
                placeholder="Ex 2"
              ></input>
              {!isInputValid(greaterThanZeroRegex)(participants) && (
                <span className="text-red-700"> *</span>
              )}
            </label>
          </div>
          <div className={styles.inputCon}>
            <label className={styles.labels}>Price: </label>
            <input
              className={styles.inputs}
              type="text"
              value={selectedPrice}
              disabled
            ></input>
          </div>
          <div className={styles.buttonCon}>
            <button
              onClick={goToPayPage}
              className={styles.submitButton}
              type="button"
              disabled={!isFormDataValid}
            >
              Next
            </button>
          </div>
        </form>
      ) : (
        <form className={styles.confirmFormCon} onSubmit={handlePayFormSubmit}>
          <div className={styles.formHeader}>
            Your Order Information
            <MdOutlineClose
              className={styles.closeBtn}
              onClick={toggleAppointmentForm}
            ></MdOutlineClose>
          </div>
          <div className={styles.dataPreviewCon}>
            {/* <div className={styles.title}>Your Order Information</div> */}
            <div className={styles.orderDetailRow}>Set: {selectedOption}</div>
            <div className={styles.orderDetailRow}>Date: {selectedDate}</div>
            <div className={styles.orderDetailRow}>Price: {selectedPrice}</div>
            <div className={styles.orderDetailRow}>Phone Number: {phone}</div>
            <div className={styles.orderDetailRow}>
              Photographer Name: {selectedPhotographer?.name}
            </div>
            <div className={styles.orderDetailRow}>
              Photographer E-mail: {selectedPhotographer?.email}
            </div>
          </div>
          {/* <div className={styles.checkBox}>
                    <input type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
                    <label htmlFor="checkbox">I have reviewed and agree to the terms and conditions</label>
                </div> */}
          <div className={styles.buttonCon}>
            <button
              onClick={handleBackButtonClick}
              className={styles.submitButton}
              type="button"
            >
              Back
            </button>
            <button className={styles.submitButton} type="submit">
              Confirm
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default AppointmentForm

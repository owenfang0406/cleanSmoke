import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { FaCheck } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { Link, Outlet } from 'react-router-dom';
import AppointmentForm from '../Appointment/AppointmentForm';
import { createPortal } from 'react-dom';
import { v4 } from 'uuid';
import { doc, setDoc, collection, addDoc } from 'firebase/firestore';
import { storage, db } from '../../firebase-config';
import { UserContext } from "../../../index";


function PricingCard({shadow="#a0c5fa", 
    background, 
    headerText, 
    currency,
    price, 
    duration,
    subTitle,
    priceText,
    buttonContent,
    data
    }) {
      const { authUser, profiles} = useContext(UserContext);

      const [selectedPrice, SetSelectedPrice] = useState(0);
      const [selectedOption, setSelectedOption] = useState('');
      const handleButtonClick = (value, option) => {
          SetSelectedPrice(value);
          setSelectedOption(headerText);
          toggleAppointmentForm();
      }

      const [shouldShowAppointmentForm, setShouldShowAppointmentForm] = useState(false);
      const toggleAppointmentForm = () => {
        setShouldShowAppointmentForm(!shouldShowAppointmentForm);
      }

      const portalContainer = document.getElementById('portalContainer');
      const appointmentFormPopup = shouldShowAppointmentForm && createPortal(
        <AppointmentForm 
        selectedPrice={selectedPrice} 
        shouldShowAppointmentForm={shouldShowAppointmentForm}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        SetSelectedPrice={SetSelectedPrice} />,
        portalContainer
      );
  return (
    <>
    <MainContainer>
      <Header background={background}>{headerText}</Header>
      <PricingContainer>
        <PriceContainer>
          <CurrencyContainer>
            <span>{currency}</span>
          </CurrencyContainer>
          <Price>
            <span>{price}</span>
          </Price>
          <Duration>
            <span>
              {duration === "m" ? "/ mo" : "/ yr"}
            </span>
          </Duration>
        </PriceContainer>
        <SubTitle>
          <h4>{subTitle}</h4>
        </SubTitle>
        <PriceText>
          <h5>{priceText}</h5>
        </PriceText>
      </PricingContainer>
      <ButtonContainer>
      <Button onClick={() => handleButtonClick(price, headerText)}>{buttonContent}</Button>
      </ButtonContainer>
      {data && (
      <DataContainer>
        <ul>
        {data.map((dt, index) => (
          <li key={index}>
              {dt.value ? <FaCheck className='true'/> : <ImCross className='false'></ImCross>} {dt.text}
          </li>
        ))}
        </ul>
      </DataContainer>)}
      </MainContainer>
      {appointmentFormPopup}
    </>
  )
}

const MainContainer = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,500;1,500&family=Rowdies:wght@400;700&family=Sulphur+Point:wght@300;400&display=swap');
  font-family: 'Sulphur Point';
  width: 20rem;
  min-height:49rem;
  height:max-content;
  background-color: #ffffff;
  display:flex;
  flex-direction: column;
  color: #1d3557;
  box-shadow: 0 8px 14px -6px ${(props) => props.shadow};
  transform: 0.4s ease-in-out;
  &:hover {
    box-shadow: 0 8px 26px -6px ${props => props.shadow}
  }
`

const Header = styled.div`
  margin:0.6rem;
  height: 4rem;
  background-color: #ebf3fd;
  background-image: ${props => props.background};
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: large;
  font-weight:600;
`

const PricingContainer = styled.div`
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 3rem;
`

const PriceContainer = styled.div`
  display: flex;
`

const CurrencyContainer = styled.div`
  margin-top: 0.5 rem;
  margin-right: 0.2rem;
`

const Price = styled.div`
span {
  font-size: 3rem;
}
`

const Duration = styled.div`
  margin-top: 2rem;
`

const SubTitle = styled.div`
  text-transform: uppercase;
  text-align: center;
  margin: 0.4rem 0 1.3rem 0
`
const PriceText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  font-weight 100;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
`

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  border: 0.3rem;
  border: 0.1rem solid #1d3557;
  width: 90%;
  height: 3.5rem;
  font-size: 1.2rem;
  cursor: pointer;
  background: transparent;
  transition: 0.3s ease-in-out;
  &:hover {
    background-color: #1d3557;
    color: white;
  }
`

const DataContainer = styled.div`
ul {
  list-style-type:none;
  margin-left: 3rem;
  li {
    display: flex;
    align-items: center;
    .true {
      color: #34f034;
    }
    .false {
      color: #f54343;
    }
    svg {
      margin-right: 0.5rem;
      font-size: 0.8rem;
    }
    margin-bottom: 1rem;
  }
}
`

export default PricingCard
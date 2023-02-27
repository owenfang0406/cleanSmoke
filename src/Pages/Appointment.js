import React from 'react'
import NavBar from '../Components/NavBar/NavBar'
import Footer from '../Components/Footer/Footer'
import PricingCard from '../Components/AD/Pricing/PricingCard'
import styled from 'styled-components'
import { Outlet } from 'react-router-dom'

const MainCon = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items; center;
    background-color: #f5f1ff;
`;

function Appointment() {
  return (
    <>
        <NavBar></NavBar>
        <MainCon>
            <PricingCard
            headerText="Option1"
            background="linear-gradient(120deg, #d4fc79, #96e6a1 100%)"
            shadow='#96e5a'
            currency="$"
            duration="hd"
            price={3000}
            subTitle="For Pre-Planned People"
            priceText="Half-day 4 hours of photography"
            buttonContent = "Select"
            data={[
                {value: false, text: "Changes before 3 days"},
                {value:true, text:"Get 30 retouched photos"}, 
                {value:false, text:"Get the whole RAW files"}
                ]}
            ></PricingCard>

            <PricingCard
            headerText="Option2"
            background="linear-gradient(120deg, #d4fc79, #96e6a1 100%)"
            shadow='#96e5a'
            currency="$"
            duration="m"
            price={5000}
            subTitle="For Planned all day tour"
            priceText="Enjoy a full 9 hours long tour with your photogrpher around"
            buttonContent = "Select"
            data={[
                {value:true, text: "Changes before 3 days"},
                {value:true, text:"Get 50 retouched photos"}, 
                {value:true, text:"Suggested attire"},
                {value:false, text:"Get the whole RAW files"},
                ]}
            ></PricingCard>

            <PricingCard
            headerText="Option3"
            background="linear-gradient(120deg, #d4fc79, #96e6a1 100%)"
            shadow='#96e5a'
            currency="$"
            duration="m"
            price={12000}
            subTitle="Luxury Combo for one day photography"
            priceText="Bring you to the next level and capture you like a pricess or pince"
            buttonContent = "Select"
            data={[
                {value:true, text: "Changes before 7 days"},
                {value:true, text: "Get 100 retouched photos"}, 
                {value:true, text:"On-site makeup artist"},
                {value:true, text: "Get the whole RAW files"}, 
                ]}
            ></PricingCard>
        </MainCon>
        <Footer></Footer>
    </>
  )
}

export default Appointment
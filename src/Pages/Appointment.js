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
            duration="m"
            price={3000}
            subTitle="For Planned Projects"
            priceText="Bring your designs to the next level and export them"
            buttonContent = "Get Started"
            data={[
                {value: false, text: "3 new projects / month"},
                {value:true, text:"Assets library"}, 
                {value:false, text:"Basic Interaction"}
                ]}
            ></PricingCard>

            <PricingCard
            headerText="Option2"
            background="linear-gradient(120deg, #d4fc79, #96e6a1 100%)"
            shadow='#96e5a'
            currency="$"
            duration="m"
            price={5000}
            subTitle="For Planned Projects"
            priceText="Bring your designs to the next level and export them"
            buttonContent = "Get Started"
            data={[
                {value: false, text: "3 new projects / month"},
                {value:true, text:"Assets library"}, 
                {value:false, text:"Basic Interaction"}
                ]}
            ></PricingCard>

            <PricingCard
            headerText="Option3"
            background="linear-gradient(120deg, #d4fc79, #96e6a1 100%)"
            shadow='#96e5a'
            currency="$"
            duration="m"
            price={12000}
            subTitle="For Planned Projects"
            priceText="Bring your designs to the next level and export them"
            buttonContent = "Get Started"
            data={[
                {value: false, text: "3 new projects / month"},
                {value:true, text:"Assets library"}, 
                {value:false, text:"Basic Interaction"}
                ]}
            ></PricingCard>
        </MainCon>
        <Footer></Footer>
    </>
  )
}

export default Appointment
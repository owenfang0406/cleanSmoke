import React, { useState, useLayoutEffect } from "react"
import NavBar from "../Components/NavBar/NavBar"
import Footer from "../Components/Footer/Footer"
import PricingCard from "../Components/AD/Pricing/PricingCard"
import styled from "styled-components"
import BottomBar from "../Components/NavBar/BottomBar"
import { useMediaQuery } from "react-responsive"
import ImageSlider from "../Components/slider"
import MobileCarousel from "../Components/Carousel/MobileCarousel"

const MainCon = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  /* margin: 150px 0px; */
  background-color: white;
`

function Appointment() {
  const isSmall = useMediaQuery({ maxWidth: 700 })
  const slides = [
    { url: "./slider/1.jpg" },
    { url: "./slider/2.jpg" },
    { url: "./slider/3.jpg" },
    { url: "./slider/4.jpg" },
    { url: "./slider/5.jpg" },
    { url: "./slider/6.jpg" },
    { url: "./slider/7.jpg" },
    { url: "./slider/8.jpg" },
    { url: "./slider/9.jpg" },
  ]
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth)
  const [isMobile, setIsMobile] = useState(false)

  useLayoutEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // console.log(window.innerWidth)

  const containerStyles = {
    width: `${viewportWidth}px`,
    height: "100vh",
    zIndex: "0",
    overscrollBehaviorX: "none",
    overscrollBehaviorY: "none",
  }

  const mobileContainerStyles = {
    ...containerStyles,
    height: "400px",
    marginTop: "70px",
  }

  const sideBarWidth =
    window.innerWidth > 1366 ? `${window.innerWidth - viewportWidth}px` : "100%"

  const overflowStyle = window.innerWidth > 1366 ? "scroll" : ""

  return (
    <>
      <NavBar></NavBar>
      <MainCon>
        <MobileCarousel
          slides={slides}
          parentWidth={viewportWidth}
        ></MobileCarousel>
        <PricingCard
          headerText="Option1"
          background="linear-gradient(120deg, #b6312c, #ffd700)"
          shadow="#96e5a"
          currency="$"
          duration="hd"
          price={3000}
          subTitle="For Pre-Planned People"
          priceText="Half-day 4 hours of photography"
          buttonContent="Select"
          data={[
            { value: false, text: "Changes before 3 days" },
            { value: true, text: "Get 30 retouched photos" },
            { value: false, text: "Get the whole RAW files" },
          ]}
        ></PricingCard>

        <PricingCard
          headerText="Option2"
          background="linear-gradient(120deg, #b6312c, #ffd700, #808080)"
          shadow="#96e5a"
          currency="$"
          duration="m"
          price={5000}
          subTitle="For Planned all day tour"
          priceText="Enjoy a full 9 hours long tour with your photogrpher around"
          buttonContent="Select"
          data={[
            { value: true, text: "Changes before 3 days" },
            { value: true, text: "Get 50 retouched photos" },
            { value: true, text: "Suggested attire" },
            { value: false, text: "Get the whole RAW files" },
          ]}
        ></PricingCard>

        <PricingCard
          headerText="Option3"
          background="linear-gradient(120deg, #b6312c, #ffd700, #dcdcdc)"
          shadow="#96e5a"
          currency="$"
          duration="m"
          price={12000}
          subTitle="Luxury Combo for one day photography"
          priceText="Bring you to the next level and capture you like a pricess or pince"
          buttonContent="Select"
          data={[
            { value: true, text: "Changes before 7 days" },
            { value: true, text: "Get 100 retouched photos" },
            { value: true, text: "On-site makeup artist" },
            { value: true, text: "Get the whole RAW files" },
          ]}
        ></PricingCard>
      </MainCon>
      <BottomBar></BottomBar>
      {!isSmall && <Footer></Footer>}
    </>
  )
}

export default Appointment

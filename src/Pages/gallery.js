import React from 'react'
import NavBar from '../Components/NavBar/NavBar'
import Footer from '../Components/Footer/Footer'
import { Link, Outlet, Route, Routes } from 'react-router-dom'
import Newpage from './newpage'
import PricingMenu from '../Components/AD/Pricing/PricingMenu'
import MasonryGallery from '../Components/AD/ADs/MasonryGallery'
import PayForm from '../Components/AD/Appointment/PayForm'
import { UserCircleIcon } from "@heroicons/react/24/solid"
import PostModal from '../Components/AD/ADs/PostModal'
import { useMediaQuery } from 'react-responsive';
import BottomBar from '../Components/NavBar/BottomBar'

function Gallery() {
  const isSmall = useMediaQuery({maxWidth: 700});
  return (
    <>
    <NavBar></NavBar>
    {/* <PricingMenu></PricingMenu> */}
    <PostModal></PostModal>
    <MasonryGallery></MasonryGallery>
    {/* <PayForm></PayForm> */}
    {/* <div>gallery</div>
    <Link to="/gallery/next"><button>go to next page</button></Link>
    <br></br>
    <Outlet></Outlet> */}
    <BottomBar></BottomBar>
    {!isSmall && <Footer></Footer>}
    </>
  )
}

export default Gallery
import React from 'react'
import NavBar from '../Components/NavBar/NavBar'
import Footer from '../Components/Footer/Footer'
import { Link, Outlet, Route, Routes } from 'react-router-dom'
import Newpage from './newpage'
import PricingMenu from '../Components/AD/Pricing/PricingMenu'

function Gallery() {
  return (
    <>
    <NavBar></NavBar>
    <PricingMenu></PricingMenu>
    <div>gallery</div>
    <Link to="/gallery/next"><button>go to next page</button></Link>
    <br></br>
    <Outlet></Outlet>
    <Footer></Footer>
    </>
  )
}

export default Gallery
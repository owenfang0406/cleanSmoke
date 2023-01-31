import React from 'react'
import NavBar from '../Components/NavBar/NavBar'
import Footer from '../Components/Footer/Footer'
import { Link, Outlet, Route, Routes } from 'react-router-dom'
import Newpage from './newpage'

function Gallery() {
  return (
    <>
    <NavBar></NavBar>
    <div>gallery</div>
    <Link to="/gallery/next"><button>go to next page</button></Link>
    <br></br>
    <Outlet></Outlet>
    <Footer></Footer>
    </>
  )
}

export default Gallery
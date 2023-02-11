import React from 'react'
import NavBar from '../Components/NavBar/NavBar'
import Footer from '../Components/Footer/Footer'
import Comments from "../Components/AD/Comment/Comments"

function About() {
  return (
    <>
    <NavBar></NavBar>
    <h1>About Us</h1>
    <Comments currentUserId="1"></Comments>
    <Footer></Footer>
    </>
  )
}

export default About
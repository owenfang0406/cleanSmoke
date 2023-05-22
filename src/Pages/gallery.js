import React from "react"
import NavBar from "../Components/NavBar/NavBar"
import Footer from "../Components/Footer/Footer"
import MasonryGallery from "../Components/AD/ADs/MasonryGallery"
import PostModal from "../Components/AD/ADs/PostModal"
import { useMediaQuery } from "react-responsive"
import BottomBar from "../Components/NavBar/BottomBar"

function Gallery() {
  const isSmall = useMediaQuery({ maxWidth: 700 })
  return (
    <>
      <NavBar></NavBar>
      <PostModal></PostModal>
      <MasonryGallery></MasonryGallery>
      <BottomBar></BottomBar>
      {!isSmall && <Footer></Footer>}
    </>
  )
}

export default Gallery

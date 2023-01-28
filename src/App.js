import './App.css';
import NavBar from './Components/NavBar/NavBar';
import React from 'react';
import ImageSlider from './Components/slider';
import Footer from './Components/Footer/Footer';
import { useEffect, useState } from 'react';
import IndexSlong1 from './Components/Slogan/IndexSlong1.js';
import IndexShowcase from './Components/IndexShowcase/IndexShowcase.js'

function App() {
  const slides = [
    {url: '../slider/image1.jpg'},
    {url: '../slider/image2.jpg'},
    {url: '../slider/image3.jpg'},
    {url: '../slider/image4.jpg'},
    {url: '../slider/image5.jpg'},
  ];
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setViewportWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  console.log(viewportWidth)

const containerStyles = {
  // width: "90%",
  height: "500px",
  margin: "30px 15px",
  zIndex: "0",
};

  return (
      <React.Fragment>
          <NavBar></NavBar>
          <div style={containerStyles}>
            <ImageSlider slides={slides} parentWidth={viewportWidth}/>
          </div>
          <IndexSlong1></IndexSlong1>
          <IndexShowcase parentWidth={viewportWidth}></IndexShowcase>
          <Footer></Footer>
      </React.Fragment>
  );
}

export default App;

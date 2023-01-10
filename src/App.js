import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar';
import React from 'react';
import ImageSlider from './Components/slider';

function App() {
  const slides = [
    {url: '../slider/image1.jpg'},
    {url: '../slider/image2.jpg'},
    {url: '../slider/image3.jpg'},
    {url: '../slider/image4.jpg'},
    {url: '../slider/image5.jpg'},
  ];

const containerStyles = {
  width: "90%",
  height: "500px",
  margin: "30px auto",
  zIndex: "0",
};

  return (
      <React.Fragment>
          <NavBar></NavBar>
          <div style={containerStyles}>
            <ImageSlider slides={slides}/>
          </div>
      </React.Fragment>
  );
}

export default App;

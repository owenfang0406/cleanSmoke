import './App.css';
import NavBar from './Components/NavBar/NavBar';
import React from 'react';
import ImageSlider from './Components/slider';
import Footer from './Components/Footer/Footer';
import { useEffect, useState, createContext, useRef} from 'react';
import IndexSlong1 from './Components/Slogan/IndexSlong1.js';
import IndexShowcase from './Components/IndexShowcase/IndexShowcase.js';
import CSSParallax from './Components/Parallax/CSSParallax';
import PricingMenu from './Components/AD/Pricing/PricingMenu';
import HomePage from './Components/HomePage/HomePage';
import BottomBar from './Components/NavBar/BottomBar';


// export const UserContext = createContext({});
function App() {
  const slides = [
    {url: '../slider/image1.jpg'},
    {url: '../slider/image2.jpg'},
    {url: '../slider/image3.jpg'},
    {url: '../slider/image4.jpg'},
    {url: '../slider/image5.jpg'},
  ];
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const footerRef = useRef(null);
  const [showFooter, setShowFooter] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);


  


  useEffect(() => {
    function handleResize() {
      setViewportWidth(window.innerWidth);
    }
  
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  

const containerStyles = {
  height: "600px",
  margin: "30px 15px",
  zIndex: "0",
};

  return (
      <React.Fragment>
        <div className="scrollbar-none">
          <NavBar parentWidth={viewportWidth}
          ></NavBar>
          <HomePage></HomePage>
        </div>
        <BottomBar></BottomBar>
      </React.Fragment>
  );
}

export default App;

import './App.css';
import NavBar from './Components/NavBar/NavBar';
import React from 'react';
import ImageSlider from './Components/slider';
import Footer from './Components/Footer/Footer';
import { useEffect, useState, createContext } from 'react';
import IndexSlong1 from './Components/Slogan/IndexSlong1.js';
import IndexShowcase from './Components/IndexShowcase/IndexShowcase.js';
import CSSParallax from './Components/Parallax/CSSParallax';
import PricingMenu from './Components/AD/Pricing/PricingMenu';


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
  useEffect(() => {
    function handleResize() {
      setViewportWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

const containerStyles = {
  // width: "90%",
  height: "600px",
  margin: "30px 15px",
  zIndex: "0",
};

// const [authUser, setAuthUser] = useState(null);
//   useEffect(() => {
//         const listen = onAuthStateChanged(auth, (user) => {
//             if (user) {
//               setAuthUser(user);
//             }else {
//               setAuthUser(null);
//             }
//             console.log(user);
//           return () => {
//             listen();
//             }
//             })
//     }, []);

//   const userSignOut = () => {
//       signOut(auth).then(()=> {
//         console.log("logged out!")
//       }).catch(err=> console.log(err))};

  return (
      <React.Fragment>
        <div className="scrollbar-none">
          <NavBar parentWidth={viewportWidth}></NavBar>
          <CSSParallax></CSSParallax>
          {/* <div style={containerStyles}>
            <ImageSlider slides={slides} parentWidth={viewportWidth}/>
          </div> */}
          {/* <IndexSlong1></IndexSlong1> */}
          {/* <IndexShowcase parentWidth={viewportWidth}></IndexShowcase> */}
          {/* <PricingMenu></PricingMenu> */}
          <Footer></Footer>
        </div>
      </React.Fragment>
  );
}

export default App;

import React, { useRef, useState, useEffect } from 'react';
import "../Styles/slider.css"

const ImageSlider = ({slides}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const sliderStyles = {
        height: "100%",
        position: "relative"
    }
    const slideStyles = {
        width: "100%",
        height: "100%",
        borderRadius: "10px",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundPosition: "bottom 60% right 50%",
        // backgroundRepeat: "no-repeat",
        backgroundImage: `url(${slides[currentIndex].url})`,
    }

    const leftArrowStyles = {
        position: "absolute",
        top: "50%",
        transform: "translate(0, -50%)",
        left: "32px",
        fontSize: "45px",
        color: "#FBF7F4",
        zIndex: 1,
        cursor: "pointer",
    }

    const rightArrowStyles = {
        position: "absolute",
        top: "50%",
        transform: "translate(0, -50%)",
        right: "32px",
        fontSize: "45px",
        color: "#FBF7F4",
        zIndex: 1,
        cursor: "pointer",
    }

    const dotsContainerStyles = {
        display: "flex",
        justifyContent: "center",
    }

    const dotStyles = {
        width: "20px",
        height: "20px",
        margin: "5px 5px",
        cursor: "pointer",
        position: 'relative',
        backgroundColor:"#6C9A8B",
        display: 'inline-block',
        borderRadius: "50%",
        border: "1px gold solid",

    }

    const GoToPrevious = () => {
        const isFirstSlide = currentIndex === 0
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }

    const GoToNext = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }

    const goToSlide = slideIndex => {
        setCurrentIndex(slideIndex);
    }

    return(
        <div style={sliderStyles}>
            <div style={leftArrowStyles} onClick={GoToPrevious}>⇦</div>
            <div style={rightArrowStyles} onClick={GoToNext}>⇨</div>
            <div style={slideStyles}>
            </div>
            <div style={dotsContainerStyles}>
                {slides.map((slides, slideIndex) => (
                    <div key={slideIndex} style={dotStyles} onClick={()=> goToSlide(slideIndex)}></div>
                ))}
            </div>
        </div>
    )
}

export default ImageSlider;
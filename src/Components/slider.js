import React, { useRef, useState, useEffect, useCallback } from 'react';
import styles from "./slider.module.css";


const ImageSlider = ({slides, parentWidth}) => {
    const timerRef =useRef(null)
    const [currentIndex, setCurrentIndex] = useState(0);

    const sliderStyles = {
        height: "100%",
        position: "relative"
    }
    const slideStyles = {
        // width: "100%",
        height: "100%",
        // borderRadius: "10px 10px",
        backgroundPosition: "center bottom 48%",
        backgroundSize: "cover",
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

    const slidesContainerStyles = {
        display: "flex",
        height: "100%",
        transition: "transform ease-out 0.3s",
    }

    const GoToPrevious = () => {
        const isFirstSlide = currentIndex === 0
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }

    const GoToNext = useCallback(() => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }, [currentIndex, slides]);

    const goToSlide = slideIndex => {
        setCurrentIndex(slideIndex);
    }

    const getSlideStylesWidthBackground = (slideIndex) => ({
        ...slideStyles,
        backgroundImage: `url(${slides[slideIndex].url})`,
        width: `${parentWidth}px`,
    });

    const getSlideContainerStylesWithWidth = () => ({
        ...slidesContainerStyles,
        width: parentWidth * slides.length,
        transform: `translateX(${-(currentIndex * parentWidth)}px)`,
    });

    useEffect(() => {
        if (timerRef.current){
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            GoToNext();
        }, 2000)

        return () => clearTimeout(timerRef.current);
    }, [GoToNext])

    const slidesContainerOverflowStyles = {
        overflow: "hidden",
        height: "100%",
    }

    return(
        <div style={sliderStyles}>
            <div style={leftArrowStyles} onClick={GoToPrevious}>⇦</div>
            <div style={rightArrowStyles} onClick={GoToNext}>⇨</div>
            <div style={slidesContainerOverflowStyles}>
                <div style={getSlideContainerStylesWithWidth()}>
                    {slides.map((_, slideIndex) => (
                        <div key={slideIndex} style={getSlideStylesWidthBackground(slideIndex)}></div>
                    ))}
                </div>
            </div>
            <div style={dotsContainerStyles}>
                {slides.map((slides, slideIndex) => (
                    <div key={slideIndex} style={dotStyles} 
                    className={slideIndex === currentIndex ? `${styles.active}` : ""}
                    onClick={()=> goToSlide(slideIndex)}></div>
                ))}
            </div>
        </div>
    )
}

export default ImageSlider;
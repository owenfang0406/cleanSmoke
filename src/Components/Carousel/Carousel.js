import React, { useRef, useState, useEffect, useCallback } from "react"
import styles from "./Carousel.module.css"
import {
  MdKeyboardArrowUp,
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
} from "react-icons/md"

const Carousel = ({ slides, parentWidth }) => {
  const timerRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const sliderStyles = {
    height: "100%",
    position: "relative",
  }
  const slideStyles = {
    height: "100%",
    backgroundPosition: "center bottom 48%",
    backgroundSize: "cover",
    backgroundImage: `url(${slides[currentIndex].url})`,
  }

  const leftArrowStyles = {
    width: "30px",
    height: "30px",
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    left: "32px",
    fontSize: "45px",
    color: "black",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "50%",
    zIndex: 1,
    cursor: "pointer",
  }

  const rightArrowStyles = {
    width: "30px",
    height: "30px",
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    right: "32px",
    fontSize: "45px",
    color: "black",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "50%",
    zIndex: 1,
    cursor: "pointer",
  }

  const dotsContainerStyles = {
    position: "relative",
    bottom: "30px",
    display: "flex",
    justifyContent: "center",
  }

  const dotStyles = {
    width: "8px",
    height: "8px",
    margin: "5px 6px",
    cursor: "pointer",
    position: "relative",
    backgroundColor: "rgba(245, 245, 245, 1)",
    display: "inline-block",
    borderRadius: "50%",
    border: "1px rgba(34, 30, 31, 1) solid",
  }

  const slidesContainerStyles = {
    display: "flex",
    height: "100%",
    transition: "transform ease-out 0.3s",
  }

  const GoToPrevious = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const GoToNext = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }, [currentIndex, slides])

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex)
  }

  const getSlideStylesWidthBackground = (slideIndex) => ({
    ...slideStyles,
    backgroundImage: `url(${slides[slideIndex].url})`,
    width: `${parentWidth}px`,
  })

  const getSlideContainerStylesWithWidth = () => ({
    ...slidesContainerStyles,
    width: parentWidth * slides.length,
    transform: `translateX(${-(currentIndex * parentWidth)}px)`,
  })

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(() => {
      GoToNext()
    }, 5000)

    return () => clearTimeout(timerRef.current)
  }, [GoToNext])

  const slidesContainerOverflowStyles = {
    position: "relative",
    overflow: "hidden",
    height: "100%",
  }

  return (
    <div style={sliderStyles}>
      <div
        className={styles.leftArrowStyles}
        onClick={GoToPrevious}
        data-testid="left-arrow"
      >
        <MdKeyboardArrowLeft className={styles.leftArrow}></MdKeyboardArrowLeft>
      </div>
      <div
        className={styles.rightArrowStyles}
        onClick={GoToNext}
        data-testid="right-arrow"
      >
        <MdKeyboardArrowRight
          className={styles.rightArrow}
        ></MdKeyboardArrowRight>
      </div>
      <div style={slidesContainerOverflowStyles}>
        <div style={getSlideContainerStylesWithWidth()}>
          {slides.map((_, slideIndex) => {
            return (
              <div
                key={slideIndex}
                style={getSlideStylesWidthBackground(slideIndex)}
              ></div>
            )
          })}
        </div>
        <div className={styles.lowerCon}>
          <div style={dotsContainerStyles}>
            <div className={styles.buildingSpacing}>棟別</div>
            {slides.map((slides, slideIndex) => (
              <div
                key={slideIndex}
                style={dotStyles}
                className={
                  slideIndex === currentIndex ? `${styles.active}` : ""
                }
                onClick={() => goToSlide(slideIndex)}
              ></div>
            ))}
          </div>
          <div className={styles.loanAdBar}>
            <div className={styles.loanClickBar}>
              <div className={styles.arrow}>
                <MdKeyboardArrowUp></MdKeyboardArrowUp>
              </div>
              <div className={styles.totalPriceTag}>
                <span className={styles.totalPrice}>
                  <span className={styles.dollarSign}>NT$</span>12,609,900
                </span>
                <span className={styles.totalPriceEndTag}>/目前總價</span>
              </div>
              <div className={styles.monthlyPriceTag}>
                <span className={styles.monthlyPice}>
                  <span className={styles.dollarSign}>NT$</span>31,609
                </span>
                <span className={styles.monthlyPiceEndTag}>/最低月付</span>
              </div>
            </div>
          </div>
          <div className={styles.shouldShow3DModelNote}>外觀3D示意圖</div>
          <div data-testid="current-slide-index">{currentIndex + 1}</div>
        </div>
      </div>
    </div>
  )
}

export default Carousel

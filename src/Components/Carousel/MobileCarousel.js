import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react"
import styles from "./MobileCarousel.module.css"
import {
  MdKeyboardArrowUp,
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
} from "react-icons/md"

const MobileCarousel = ({ slides, parentWidth }) => {
  const timerRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayIndex, setDisplayIndex] = useState(1)
  const slideRefs = useRef([])
  const SliderContainerRef = useRef(null)
  const [xPosition, setXPosition] = useState(0)

  useEffect(() => {
    const container = SliderContainerRef.current
    const slidesIDs = window.document.querySelectorAll("#slides")

    const handleScroll = () => {
      setXPosition(() => container.scrollLeft)
      const closestPosition = Math.round(
        container.scrollLeft / (parentWidth * 0.95)
      )
      setDisplayIndex(() => closestPosition + 1)
      setCurrentIndex(() => closestPosition)
    }

    container.addEventListener("scroll", handleScroll)
    console.log(slides)

    return () => {
      container.removeEventListener("scroll", handleScroll)
    }
  }, [])
  const RWDheight = parentWidth > 800 ? "70vh" : "40vh"
  const sliderStyles = {
    margin: "30px 0px",
    height: `${RWDheight}`,
    position: "relative",
    width: "100vw",
    overflow: "hidden",
  }

  const slideStyles = {
    height: "100%",
    width: "100vw",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundImage: `url(${slides[currentIndex].url})`,
    position: "relative",
    marginRight: "15px",
    scrollSnapAlign: "center",
    borderRadius: "10px",
  }

  const slidesContainerStyles = {
    display: "flex",
    height: "100%",
    transition: "transform ease-out 0.3s",
    scrollSnapType: "x mandatory",
    scrollbarWidth: "none", // Hide the scrollbar for Firefox
    "-ms-overflow-style": "none", // Hide the scrollbar for IE and Edge
    "&::-webkit-scrollbar": {
      // Hide the scrollbar for Chrome and Safari
      display: "none",
    },
  }

  const GoToPrevious = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)

    const slideOffsetLeft = slideRefs.current[newIndex].offsetLeft
    const container = SliderContainerRef.current
    container.scrollLeft = slideOffsetLeft
  }

  const GoToNext = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
    const slideOffsetLeft = slideRefs.current[newIndex].offsetLeft
    const container = SliderContainerRef.current
    container.scrollLeft = slideOffsetLeft
  }, [currentIndex, slides])

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex)
  }

  const getSlideStylesWidthBackground = (slideIndex) => ({
    ...slideStyles,
    backgroundImage: `url(${slides[slideIndex].url})`,
    width: `${parentWidth * 0.95}px`,
  })

  const getSlideContainerStylesWithWidth = () => {
    const slideWidth = parentWidth * 0.95
    // const transform = `translateX(${-(currentIndex * slideWidth)}px)`

    return {
      ...slidesContainerStyles,
      width: slideWidth * slides.length,
      // transform: transform,
    }
  }

  const slidesContainerOverflowStyles = {
    position: "relative",
    overflow: "scroll",
    height: "100%",
    scrollSnapType: "x mandatory",
    scrollbarWidth: "none", // Hide the scrollbar for Firefox
    "-ms-overflow-style": "none", // Hide the scrollbar for IE and Edge
    "&::-webkit-scrollbar": {
      // Hide the scrollbar for Chrome and Safari
      display: "none",
    },
  }

  return (
    <div style={sliderStyles}>
      <div className={styles.leftArrowStyles} onClick={GoToPrevious}>
        <MdKeyboardArrowLeft className={styles.leftArrow}></MdKeyboardArrowLeft>
      </div>
      <div className={styles.rightArrowStyles} onClick={GoToNext}>
        <MdKeyboardArrowRight
          className={styles.rightArrow}
        ></MdKeyboardArrowRight>
      </div>
      <div className={styles.lowerCon}>
        {/* <div
          className={styles.buildingSpacing}
        >{`張數 ${displayIndex} / ${slides.length}`}</div> */}
        <div
          className={styles.shouldShow3DModelNote}
        >{`張數 ${displayIndex} / ${slides.length}`}</div>
      </div>
      <div style={slidesContainerOverflowStyles} ref={SliderContainerRef}>
        <div style={getSlideContainerStylesWithWidth()}>
          {slides.map((_, slideIndex) => {
            return (
              <div
                id="slides"
                key={slideIndex}
                style={getSlideStylesWidthBackground(slideIndex)}
                ref={(el) => (slideRefs.current[slideIndex] = el)}
              ></div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default MobileCarousel

import React from "react"
import { render } from "@testing-library/react"
const carousel = require("./Carousel")
import { fireEvent, render } from "@testing-library/react"
import Carousel from "./Carousel"

test("clicking left arrow decrements the current slide index", () => {
  const slides = [
    { url: "https://example.com/slide1.jpg" },
    { url: "https://example.com/slide2.jpg" },
    { url: "https://example.com/slide3.jpg" },
  ]
  const parentWidth = 800
  const { getByTestId } = render(
    <Carousel slides={slides} parentWidth={parentWidth}></Carousel>
  )
  const leftArrow = getByTestId("left-arrow")
  fireEvent.click(leftArrow)
  expect(getByTestId("current-slide-index")).toHaveTextContent("2")
})

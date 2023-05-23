import React from "react"

function useDebounce(func, delay = 1000) {
  let timer
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

export default useDebounce

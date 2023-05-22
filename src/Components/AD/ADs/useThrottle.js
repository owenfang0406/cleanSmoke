import React, { useState } from "react"

function useThrottle(func, delay = 500) {
  // const [isThrottled, setIsThrottled] = useState(false)

  let shouldExit = false

  return function (...args) {
    if (shouldExit) {
      return
    }
    func(...args)
    shouldExit = true
    setTimeout(() => {
      shouldExit = false
    }, delay)
  }
}

export default useThrottle

import React, { useState } from "react"
import DatePicker from "react-datepicker"

const DatePickerComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null)

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        minDate={new Date()}
      />
    </div>
  )
}

export default DatePickerComponent

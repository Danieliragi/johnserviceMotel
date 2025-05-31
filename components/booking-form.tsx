"use client"

import type React from "react"

import { useState } from "react"
import { format } from "date-fns"
import { DayPicker } from "react-day-picker"

type BookingFormProps = {
  onSubmit: (date: Date | undefined) => void
}

const BookingForm: React.FC<BookingFormProps> = ({ onSubmit }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(selectedDate)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="date">Select a Date:</label>
        <DayPicker mode="single" selected={selectedDate} onSelect={handleDateChange} />
        {selectedDate && <p>You selected {format(selectedDate, "PPP")}.</p>}
      </div>
      <button type="submit">Book Appointment</button>
    </form>
  )
}

export default BookingForm

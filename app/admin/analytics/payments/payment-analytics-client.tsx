"use client"

import { useState } from "react"
import { format } from "date-fns"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const PaymentAnalyticsClient = () => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  return (
    <div>
      <h2>Payment Analytics</h2>
      <div>
        <label>Start Date:</label>
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
      </div>
      <div>
        <label>End Date:</label>
        <DatePicker
          selected={endDate}
          onChange={(date: Date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />
      </div>
      <div>
        <p>Start Date: {format(startDate, "PPP")}</p>
        <p>End Date: {format(endDate, "PPP")}</p>
      </div>
    </div>
  )
}

export default PaymentAnalyticsClient

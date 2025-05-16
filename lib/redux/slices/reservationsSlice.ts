import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface GuestDetails {
  firstName: string
  lastName: string
  email: string
  phone: string
  specialRequests: string
}

interface ReservationState {
  bookingStep: number
  guestDetails: GuestDetails
  currentReservation: any | null
}

const initialState: ReservationState = {
  bookingStep: 1,
  guestDetails: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
  },
  currentReservation: null,
}

const reservationsSlice = createSlice({
  name: "reservations",
  initialState,
  reducers: {
    nextBookingStep: (state) => {
      state.bookingStep += 1
    },
    previousBookingStep: (state) => {
      if (state.bookingStep > 1) {
        state.bookingStep -= 1
      }
    },
    setGuestDetails: (state, action: PayloadAction<Partial<GuestDetails>>) => {
      state.guestDetails = { ...state.guestDetails, ...action.payload }
    },
    setCurrentReservation: (state, action: PayloadAction<any>) => {
      state.currentReservation = action.payload
    },
    resetBookingProcess: (state) => {
      state.bookingStep = 1
      state.guestDetails = initialState.guestDetails
    },
  },
})

export const { nextBookingStep, previousBookingStep, setGuestDetails, setCurrentReservation, resetBookingProcess } =
  reservationsSlice.actions

export default reservationsSlice.reducer

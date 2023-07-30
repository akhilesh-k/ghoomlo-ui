import { createSlice } from '@reduxjs/toolkit'

export const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    pickUpLocation: '',
    dropLocation: '',
    bookingDate: '',
    vehicle: ''
  },
  reducers: {
    // redux toolkit uses immer internally ("state" here is actually a draft)
    updatePickUpLocation: (state, action) => {
      state.pickUpLocation = action.payload.pickUpLocation
    },
    updateDropLocation: (state, action) => {
      state.dropLocation = action.payload.dropLocation
    },
    updateBookingDate: (state, action) => {
      state.bookingDate = action.payload.bookingDate
    },
    updateVehicle: (state, action) => {
      state.vehicle = action.payload.vehicle
    },
    updateBooking: (state, action) => {
      state = action.payload
    }
  }
})

export const {
  updatePickUpLocation,
  updateDropLocation,
  updateBookingDate,
  updateVehicle
} = bookingSlice.actions

export default bookingSlice.reducer
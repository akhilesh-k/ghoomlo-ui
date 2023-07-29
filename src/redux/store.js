import { configureStore } from '@reduxjs/toolkit'
import bookingReducer from './slices/booking-slice'

export default configureStore({
  reducer: {
    booking: bookingReducer
  }
})
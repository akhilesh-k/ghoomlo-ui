import { createSlice } from "@reduxjs/toolkit";

export const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    pickUpLocation: "",
    dropLocation: "",
    bookingDate: "",
    vehicle: "Any",
    availableVehicles: [
      {
        id: 1,
        name: "Vehicle - Any",
        value: "Any",
        image: "",
        type: "",
        seats: "",
        rate: "",
        displayName: "",
      },
      {
        id: 2,
        name: "Vehicle - Honda Amaze / Swift Dezire",
        value: "Honda Amaze / Swift Dezire",
        image: "sedan.svg",
        type: "Sedan",
        seats: "4",
        rate: "",
        displayName: "",
      },
      {
        id: 3,
        name: "Vehicle - Innova",
        value: "Innova",
        image: "mvp.svg",
        type: "MPV",
        seats: "6",
        rate: "",
        displayName: "",
      },
      {
        id: 4,
        name: "Vehicle - WagonR / Celario / Alto 800",
        value: "WagonR / Celario / Alto 800",
        image: "mini.svg",
        type: "Mini",
        seats: "3",
        rate: "",
        displayName: "",
      },
      {
        id: 5,
        name: "Vehicle - Scorpio",
        value: "Scorpio",
        image: "suv.svg",
        type: "SUV",
        seats: "",
        rate: "",
        displayName: "",
      },
      {
        id: 6,
        name: "Vehicle - Tempo Traveller",
        value: "Tempo Traveller",
        image: "traveller.svg",
        type: "Traveller",
        seats: "",
        rate: "",
        displayName: "",
      },
      {
        id: 7,
        name: "Vehicle - Luxury",
        value: "Luxury",
        image: "luxury.svg",
        type: "✨ Luxury",
        seats: "",
        rate: "",
        displayName: "",
      },
    ],
  },
  reducers: {
    // redux toolkit uses immer internally ("state" here is actually a draft)
    updatePickUpLocation: (state, action) => {
      state.pickUpLocation = action.payload.pickUpLocation;
    },
    updateDropLocation: (state, action) => {
      state.dropLocation = action.payload.dropLocation;
    },
    updateBookingDate: (state, action) => {
      state.bookingDate = action.payload.bookingDate;
    },
    updateVehicle: (state, action) => {
      state.vehicle = action.payload.vehicle;
    },
    updateBooking: (state, action) => {
      state = action.payload;
    },
  },
});

export const {
  updatePickUpLocation,
  updateDropLocation,
  updateBookingDate,
  updateVehicle,
} = bookingSlice.actions;

export default bookingSlice.reducer;

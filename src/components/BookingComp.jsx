import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  updatePickUpLocation,
  updateDropLocation,
  updateBookingDate,
  updateVehicle
} from '../redux/slices/booking-slice.js'

import InputComp from './InputComp'
import SelectComp from './SelectComp'
import ButtonComp from './ButtonComp'

import './css/booking-comp.css'

const BookingComp = () => {
  const dispatch = useDispatch()

  const pickUpLocation = useSelector(state => state.booking.pickUpLocation)
  const dropLocation = useSelector(state => state.booking.dropLocation)
  const bookingDate = useSelector(state => state.booking.bookingDate)
  const vehicle = useSelector(state => state.booking.vehicle)
  const [disableEnquireCta, setDisableEnquireCta] = useState(true)

  useEffect(() => {
    setDisableEnquireCta(!(pickUpLocation?.length > 0 &&
      dropLocation?.length > 0 &&
      bookingDate?.toLocaleString()?.length > 0))
  }, [pickUpLocation, dropLocation, bookingDate, disableEnquireCta])

  const inputsConfig = [{
    id: 1,
    placeholder: 'Enter Pickup Location',
    type: 'text',
    value: '',
    label: null
  },
  {
    id: 2,
    placeholder: 'Enter Drop Location',
    type: 'text',
    value: '',
    label: null
  },
  {
    id: 3,
    placeholder: 'Choose Pickup Date',
    type: 'datetime-local',
    value: undefined,
    label: 'Booking Date'
  }]

  const availableVehicles = [{
    id: 1,
    name: 'Vehicle - Any',
    value: 'Any'
  },
  {
    id: 2,
    name: 'Vehicle - Scorpio',
    value: 'Scorpio'
  },
  {
    id: 3,
    name: 'Vehicle - Honda Amaze',
    value: 'Honda Amaze'
  },
  {
    id: 4,
    name: 'Vehicle - Swift Dezire',
    value: 'Swift Dezire'
  },{
    id: 5,
    name: 'Vehicle - Innova',
    value: 'Innova'
  },
  {
    id: 6,
    name: 'Vehicle - WagonR',
    value: 'WagonR'
  },
  {
    id: 7,
    name: 'Vehicle - Celerio',
    value: 'Celerio'
  },
  {
    id: 8,
    name: 'Vehicle - Alto 800',
    value: 'Alto-800'
  },
  {
    id: 9,
    name: 'Vehicle - Tempo Traveller',
    value: 'Tempo Traveller'
  }]

  const updateDetails = (event, id) => {
    switch(id) {
      case 1:
        dispatch(updatePickUpLocation({
          pickUpLocation: event.target.value
        }))
        break
      case 2:
        dispatch(updateDropLocation({
          dropLocation: event.target.value
        }))
        break
      case 3:
        dispatch(updateBookingDate({
          bookingDate: event.target.value
        }))
        break
      case 4:
        dispatch(updateVehicle({
          vehicle: event.target.value
        }))
        break
      default:
        break
    }
  }

  const confirmBooking = () => {
    const indianTime = new Date(bookingDate).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour12: true,
      hour: "numeric",
      minute: "numeric",
    })
    const phone = 916200944189
    const message = `https://api.whatsapp.com/send?phone=${encodeURIComponent(
      phone
    )}&text=Hi,%0AI want to book a cab, here are the details:%0A*Vehicle Type:* ${encodeURIComponent(
      vehicle
    )}%0A*Pickup:* ${encodeURIComponent(
      pickUpLocation
    )}%0A*Drop:* ${encodeURIComponent(
      dropLocation
    )}%0A*Date:* ${encodeURIComponent(indianTime)}`
    window.open(message, '_blank')
  }

  return (
    <div className="booking-comp">
      <div className='heading-section'>
        <strong>
          BEST INTERCITY CABS
        </strong>
      </div>
      <div className="form">
        {inputsConfig.map(config => {
          return (
            <InputComp
              key={config.id}
              type={config.type}
              placeholder={config.placeholder}
              label={config.label}
              onChange={event => updateDetails(event, config.id)}
            />
          )
        })}
        <SelectComp
          name="vehicle-selector"
          options={availableVehicles}
          onChange={event => updateDetails(event, 4)}
        />
        <div className="action-container">
          <ButtonComp
            type="primary"
            disabled={disableEnquireCta}
            onClick={() => confirmBooking()}
          >
            <span className="font-16-lh-20">
              Enquire Now
            </span>
          </ButtonComp>
        </div>
      </div>
    </div>
  )
}

export default BookingComp
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import InputComp from './InputComp'
import './css/booking-comp.css'

const BookingComp = () => {
  const booking = useSelector(state => state.booking)
  // const dispatch = useDispatch()

  const pickUpLocation = useRef(booking.pickUpLocation)
  const dropLocation = useRef(booking.dropLocation)
  const bookingDate = useRef(booking.date)
  // const vehicle = useRef(booking.vehicle)

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

  const updateDetails = (event, id) => {
    switch(id) {
      case 1:
        pickUpLocation.current = event.target.value
        break
      case 2:
        dropLocation.current = event.target.value
        break
      case 3:
        bookingDate.current = event.target.value
        break
      default:
        break
    }
  }

  const confirmBooking = () => {
  }

  return (
    <div className="booking-comp">
      <div className='heading-section'>
        <strong>
          BEST INTERCITY CABS
        </strong>
      </div>
      <form
        className="form"
        onSubmit={confirmBooking}
      >
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
      </form>
    </div>
  )
}

export default BookingComp
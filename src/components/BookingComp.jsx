import { useRef } from 'react'
import { useSelector } from 'react-redux'
import InputComp from './InputComp'
import './css/booking-comp.css'
import SelectComp from './SelectComp'
import ButtonComp from './ButtonComp'

const BookingComp = () => {
  const booking = useSelector(state => state.booking)
  // const dispatch = useDispatch()

  const pickUpLocation = useRef(booking.pickUpLocation)
  const dropLocation = useRef(booking.dropLocation)
  const bookingDate = useRef(booking.date)
  const vehicle = useRef(booking.vehicle)

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
        pickUpLocation.current = event.target.value
        break
      case 2:
        dropLocation.current = event.target.value
        break
      case 3:
        bookingDate.current = event.target.value
        break
      case 4:
        vehicle.current = event.target.value
        break
      default:
        break
    }
  }

  const confirmBooking = () => {
    console.log('BOOKING CONFIRMED')
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
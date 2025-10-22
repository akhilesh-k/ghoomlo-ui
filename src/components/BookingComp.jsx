import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  updatePickUpLocation,
  updateDropLocation,
  updateVehicle,
} from "../redux/slices/booking-slice.js";

import InputComp from "./InputComp";
import SelectComp from "./SelectComp";
import ButtonComp from "./ButtonComp";
import DatePickerInput from "./DatePickerInput.jsx";

import "./css/booking-comp.css";

const BookingComp = ({ initialPickup = '', initialDropoff = '' }) => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(null);

  const [pickupInput, setPickupInput] = useState(initialPickup);
  const [dropoffInput, setDropoffInput] = useState(initialDropoff);

  useEffect(() => {
    setPickupInput(initialPickup);
    setDropoffInput(initialDropoff);
    if (initialPickup) {
      dispatch(updatePickUpLocation({ pickUpLocation: initialPickup }));
    }
    if (initialDropoff) {
      dispatch(updateDropLocation({ dropLocation: initialDropoff }));
    }
  }, [initialPickup, initialDropoff, dispatch]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const pickUpLocation = useSelector((state) => state.booking.pickUpLocation);
  const dropLocation = useSelector((state) => state.booking.dropLocation);
  const vehicle = useSelector((state) => state.booking.vehicle);
  const availableVehicles = useSelector(
    (state) => state.booking.availableVehicles
  );

  const [disableEnquireCta, setDisableEnquireCta] = useState(true);

  useEffect(() => {
    setDisableEnquireCta(
      !(
        pickUpLocation?.length > 0 &&
        dropLocation?.length > 0 &&
        selectedDate?.toLocaleString()?.length > 0
      )
    );
  }, [pickUpLocation, dropLocation, selectedDate, disableEnquireCta]);

  const inputsConfig = [
    {
      id: 1,
      placeholder: "Enter Pickup Location",
      type: "text",
      value: pickupInput,
      label: null,
      onChange: (e) => setPickupInput(e.target.value),
    },
    {
      id: 2,
      placeholder: "Enter Drop Location",
      type: "text",
      value: dropoffInput,
      label: null,
      onChange: (e) => setDropoffInput(e.target.value),
    },
  ];

  const updateDetails = (event, id) => {
    switch (id) {
      case 1:
        dispatch(
          updatePickUpLocation({
            pickUpLocation: event.target.value,
          })
        );
        break;
      case 2:
        dispatch(
          updateDropLocation({
            dropLocation: event.target.value,
          })
        );
        break;
      // case 3: Removed updateBookingDate case, no longer needed
      case 4:
        dispatch(
          updateVehicle({
            vehicle: event.target.value,
          })
        );
        break;
      default:
        break;
    }
  };

  const confirmBooking = () => {
    const indianTime = new Date(selectedDate).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const phone = 916200944189;
    const message = `https://api.whatsapp.com/send?phone=${encodeURIComponent(
      phone
    )}&text=Hi,%0AI want to book a cab, here are the details:%0A*Vehicle Type:* ${encodeURIComponent(
      vehicle
    )}%0A*Pickup:* ${encodeURIComponent(
      pickUpLocation
    )}%0A*Drop:* ${encodeURIComponent(
      dropLocation
    )}%0A*Date:* ${encodeURIComponent(indianTime)}`;
    window.open(message, "_blank");
  };

  return (
    <div className="booking-comp">
      <div className="heading-section">
        <strong>BEST INTERCITY CABS</strong>
      </div>
      <div className="form">
        {inputsConfig.map((config) => {
          return (
            <InputComp
              key={config.id}
              type={config.type}
              placeholder={config.placeholder}
              label={config.label}
              value={config.value} // Use value from inputsConfig
              onChange={config.onChange} // Use onChange from inputsConfig
            />
          );
        })}
        <div>
          <DatePickerInput
            inputProps={{ readOnly: true }}
            className="date-input"
            selectedDate={selectedDate}
            onChange={handleDateChange}
          />
        </div>

        <SelectComp
          name="vehicle-selector"
          options={availableVehicles}
          selected={vehicle}
          onChange={(event) => updateDetails(event, 4)}
        />
        <div className="action-container">
          <ButtonComp
            type="primary"
            disabled={disableEnquireCta}
            onClick={() => confirmBooking()}
          >
            <span className="font-16-lh-20">Enquire Now</span>
          </ButtonComp>
        </div>
      </div>
    </div>
  );
};

export default BookingComp;
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import useDebounce from "../hooks/useDebounce";

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

const BookingComp = () => {
  const lat = useRef();
  const long = useRef();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          lat.current = position.coords.latitude;
          long.current = position.coords.longitude;
          console.log("Latitude:", position.coords.latitude);
          console.log("Longitude:", position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(null);
  const [suggestions, setSuggestions] = useState({ pickup: [], drop: [] });
  const [showSuggestions, setShowSuggestions] = useState({
    pickup: false,
    drop: false,
  });

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
      value: "",
      label: null,
    },
    {
      id: 2,
      placeholder: "Enter Drop Location",
      type: "text",
      value: "",
      label: null,
    },
  ];

  const [pickupInput, setPickupInput] = useState("");
  const [dropInput, setDropInput] = useState("");

  const debouncedPickupInput = useDebounce(pickupInput, 500);
  const debouncedDropInput = useDebounce(dropInput, 500);

  useEffect(() => {
    if (debouncedPickupInput) {
      fetchSuggestions(debouncedPickupInput, "pickup");
    }
  }, [debouncedPickupInput]);

  useEffect(() => {
    if (debouncedDropInput) {
      fetchSuggestions(debouncedDropInput, "drop");
    }
  }, [debouncedDropInput]);

  const updateDetails = (event, id) => {
    const value = event.target.value;
    switch (id) {
      case 1:
        setPickupInput(value);
        dispatch(
          updatePickUpLocation({
            pickUpLocation: value,
          })
        );
        break;
      case 2:
        setDropInput(value);
        dispatch(
          updateDropLocation({
            dropLocation: value,
          })
        );
        break;
      case 4:
        dispatch(
          updateVehicle({
            vehicle: value,
          })
        );
        break;
      default:
        break;
    }
  };

  const fetchSuggestions = async (input, type) => {
    const apiKey = "e3hI9TvuzFGl6AZUe9LElB934ZwqorL803EDReYS";
    const url =
      lat.current && long.current
        ? `https://api.olamaps.io/places/v1/autocomplete?location=${lat.current},${long.current}&input=${input}&api_key=${apiKey}`
        : `https://api.olamaps.io/places/v1/autocomplete?input=${input}&api_key=${apiKey}`;
    try {
      const response = await axios.get(url, {
        headers: {
          "X-Request-Id": "YOUR_REQUEST_ID",
        },
      });
      const data = response.data;
      setSuggestions((prevSuggestions) => ({
        ...prevSuggestions,
        [type]: data.predictions || [],
      }));
      setShowSuggestions((prevShowSuggestions) => ({
        ...prevShowSuggestions,
        [type]: true,
      }));
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const selectSuggestion = (suggestion, type) => {
    if (type === "pickup") {
      dispatch(
        updatePickUpLocation({
          pickUpLocation: suggestion.description,
        })
      );
    } else {
      dispatch(
        updateDropLocation({
          dropLocation: suggestion.description,
        })
      );
    }
    setShowSuggestions((prevShowSuggestions) => ({
      ...prevShowSuggestions,
      [type]: false,
    }));
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
        <div>Local</div>
        <div>Outstation</div>
        <div>Package</div>
      </div>
      <div className="form">
        {inputsConfig.map((config) => {
          return (
            <div key={config.id} className="input-wrapper">
              <InputComp
                type={config.type}
                placeholder={config.placeholder}
                label={config.label}
                onChange={(event) => updateDetails(event, config.id)}
                value={config.id === 1 ? pickupInput : dropInput}
              />
              {showSuggestions[config.id === 1 ? "pickup" : "drop"] && (
                <div className="suggestions">
                  {suggestions[config.id === 1 ? "pickup" : "drop"].map(
                    (suggestion) => (
                      <div
                        key={suggestion.place_id}
                        className="suggestion-item"
                        onClick={() =>
                          selectSuggestion(
                            suggestion,
                            config.id === 1 ? "pickup" : "drop"
                          )
                        }
                      >
                        {suggestion.description}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
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

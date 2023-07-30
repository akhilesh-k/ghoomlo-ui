import "./css/home.css";

import { useSelector } from "react-redux";
import BookingComp from "../components/BookingComp";
import VehicleCard from "../components/VehicleCard";
import PhoneImage from "@/assets/images/phone.svg";
import WhatsappImage from "@/assets/images/whatsapp.svg";
import { useRef } from "react";
import UniqueSellingPoint from "../components/UniqueSellingPoint";

const Home = () => {
  const phone = useRef(+916200944189);

  const makeCall = (e) => {
    e.stopPropagation();
    e.preventDefault();
    window.location.href = `tel:${phone.current}`;
  };
  const confirmBooking = () => {
    const message = `https://api.whatsapp.com/send?phone=${encodeURIComponent(
      phone.current
    )}&text=Hi,%0AI want to book a cab`;
    window.open(message, "_blank");
  };
  const availableVehicles = useSelector(
    (state) => state.booking.availableVehicles
  );
  return (
    <>
      <BookingComp />
      <div className="caller-action">
        <img src={PhoneImage} alt="" onClick={makeCall} />
        <img src={WhatsappImage} alt="" onClick={confirmBooking} />
      </div>
      <p className="section-title">Outstation vehicles</p>

      {availableVehicles.map((vehicle) => {
        if (vehicle.id > 1 && vehicle.id < availableVehicles.length) {
          return <VehicleCard key={vehicle.id} vehicleData={vehicle} />;
        } else if (vehicle.id === availableVehicles.length) {
          return (
            <div key={vehicle.id}>
              <p className="section-title">Luxury vehicles</p>
              <VehicleCard vehicleData={vehicle} />
            </div>
          );
        }
      })}
      <UniqueSellingPoint />
      <p className="about">
        GhoomLo is Bihar’s largest Cab network providing travel and tour
        services all over India.
        <br />
        &nbsp;
        <br />
        Book affordable taxi service for Airport, Outstation & Local Trip with
        GhoomLo.
        <br />
        &nbsp;
        <br />
        We have all type of vehicles from Hatchbacks to Sedan and SUVs. We also
        take bookings for Luxury vehicles for your best occasions. Book today
        and enjoy the best tour and travel experiences.
      </p>
    </>
  );
};

export default Home;

import "./css/home.css";

import { useSelector } from "react-redux";
import BookingComp from "../components/BookingComp";
import VehicleCard from "../components/VehicleCard";
import PhoneImage from "@/assets/images/phone.svg";
import Footer from "../components/Footer";
import WhatsappImage from "@/assets/images/whatsapp.svg";
import { useRef, useEffect } from "react";
import UniqueSellingPoint from "../components/UniqueSellingPoint";
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import citiesData from '../data/cities.json';

const Home = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  let currentCity = null;
  let fromCity = null;
  let toCity = null;

  // Try to match as from-to-cabs slug first
  if (slug) {
    const fromToMatch = slug.match(/(.*)-to-(.*)-cabs/);
    if (fromToMatch && fromToMatch[1] && fromToMatch[2]) {
      fromCity = fromToMatch[1];
      toCity = fromToMatch[2];
    } else {
      // If not from-to-cabs, treat as single city slug
      currentCity = slug;
    }
  }

  const isValidCity = (cityName) => {
    const normalizedCityName = cityName.toLowerCase().replace(/-/g, ' ');
    return citiesData.some(c => c.toLowerCase() === normalizedCityName);
  };

  let pageTitle = "Ghoomlo - Car Rentals in Bihar";
  let metaDescription = "Book affordable and reliable car rentals in Bihar. Explore Bihar with Ghoomlo.";
  let sectionTitle = "Outstation vehicles";
  let initialPickup = '';
  let initialDropoff = '';

  useEffect(() => {
    if (fromCity && toCity) {
      const normalizedFromCity = fromCity.toLowerCase().replace(/-/g, ' ');
      const normalizedToCity = toCity.toLowerCase().replace(/-/g, ' ');

      if (!(isValidCity(normalizedFromCity) && isValidCity(normalizedToCity))) {
        navigate('/');
      }
    } else if (currentCity) {
      const normalizedCity = currentCity.toLowerCase().replace(/-/g, ' ');
      if (!isValidCity(normalizedCity)) {
        navigate('/');
      }
    }
  }, [currentCity, fromCity, toCity, navigate]);

  if (fromCity && toCity) {
    const normalizedFromCity = fromCity.toLowerCase().replace(/-/g, ' ');
    const normalizedToCity = toCity.toLowerCase().replace(/-/g, ' ');

    if (isValidCity(normalizedFromCity) && isValidCity(normalizedToCity)) {
      const displayFromCity = normalizedFromCity.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      const displayToCity = normalizedToCity.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

      pageTitle = `Ghoomlo - Cabs from ${displayFromCity} to ${displayToCity}`;
      metaDescription = `Book affordable and reliable cabs from ${displayFromCity} to ${displayToCity}. Explore hassle-free travel with Ghoomlo.`;
      sectionTitle = `Cabs from ${displayFromCity} to ${displayToCity}`;
      initialPickup = displayFromCity;
      initialDropoff = displayToCity;
    }
  } else if (currentCity) {
    const normalizedCity = currentCity.toLowerCase().replace(/-/g, ' ');
    if (isValidCity(normalizedCity)) {
      const displayCityName = normalizedCity.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      pageTitle = `Ghoomlo - Car Rentals in ${displayCityName}`;
      metaDescription = `Book affordable and reliable car rentals in ${displayCityName}. Explore ${displayCityName} with Ghoomlo.`;
      sectionTitle = `Vehicles in ${displayCityName}`;
      initialPickup = displayCityName;
    }
  }

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
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
      </Helmet>

      <BookingComp initialPickup={initialPickup} initialDropoff={initialDropoff} />
      <div className="caller-action">
        <img src={PhoneImage} alt="" onClick={makeCall} />
        <img src={WhatsappImage} alt="" onClick={confirmBooking} />
      </div>
      <p className="section-title">{sectionTitle}</p>

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
      <Footer />
    </>
  );
};

export default Home;

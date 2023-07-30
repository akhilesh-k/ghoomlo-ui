import "./css/vehicle-card.css";
import Mini from "@/assets/images/mini.svg";
import Sedan from "@/assets/images/sedan.svg";
import Suv from "@/assets/images/suv.svg";
import Mpv from "@/assets/images/mpv.svg";
import Traveller from "@/assets/images/traveller.svg";
import Luxury from "@/assets/images/luxury.svg";
import ButtonComp from "./ButtonComp";
import { updateVehicle } from "../redux/slices/booking-slice.js";
import { useDispatch } from "react-redux";

const VehicleCard = ({ vehicleData }) => {
  const dispatch = useDispatch();
  const updateVehicleType = () => {
    window.scrollTo(0, 0);
    dispatch(
      updateVehicle({
        vehicle: vehicleData.value,
      })
    );
  };
  const getImage = () => {
    switch (vehicleData.type?.toLowerCase()) {
      case "mini":
        return Mini;
      case "suv":
        return Suv;
      case "sedan":
        return Sedan;
      case "mpv":
        return Mpv;
      case "traveller":
        return Traveller;
      case "✨ luxury":
        return Luxury;
      default:
        return;
    }
  };
  return (
    <div className="vehicle-card">
      <img className="vehicle-image" src={getImage()} alt="" srcSet="" />
      <p className="vehicle-title">{vehicleData.value}</p>
      <div className="seat-rate">
        <p>{vehicleData.seats} + 1 Seater</p>
        <p>₹ {vehicleData.rate} / KM</p>
      </div>
      <ButtonComp type="primary" size="small" onClick={updateVehicleType}>
        <span className="font-16-lh-20">Enquire Now</span>
      </ButtonComp>
      <div className="pill">{vehicleData.type}</div>
    </div>
  );
};

export default VehicleCard;

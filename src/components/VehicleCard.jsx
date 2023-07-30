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
      <img
        className="vehicle-image"
        src={getImage()}
        alt=""
        srcSet=""
      />
      <p className="vehicle-title">
        {vehicleData.value}
      </p>
      <ButtonComp
        type="primary"
        onClick={updateVehicleType}
      >
        Enquire Now
      </ButtonComp>
    </div>
  );
};

export default VehicleCard;

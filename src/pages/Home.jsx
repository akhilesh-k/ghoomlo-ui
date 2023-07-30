import { useSelector } from "react-redux";
import BookingComp from "../components/BookingComp";
import VehicleCard from "../components/VehicleCard";
const Home = () => {
  const availableVehicles = useSelector(
    (state) => state.booking.availableVehicles
  );
  return (
    <>
      <BookingComp />
      {availableVehicles.map((vehicle) => {
        if (vehicle.id > 1) {
          return <VehicleCard key={vehicle.id} vehicleData={vehicle} />;
        }
      })}
    </>
  );
};

export default Home;

import "./css/unique-selling-point.css";
import CleanCar from "@/assets/icons/clean-car.svg";
import LiveGps from "@/assets/icons/live-gps.svg";
import TransparentBilling from "@/assets/icons/transparent-billing.svg";
import VerifiedDrivers from "@/assets/icons/verified-drivers.svg";

const UniqueSellingPoint = () => {
  return (
    <div className="usp-container">
      <h2 className="usp-title">What sets us apart?</h2>
      <div className="usp-items">
        <div className="usp-item">
          <img src={CleanCar} alt="Clean and Hygenic Car" />
          <p>Clean and Hygenic Car</p>
        </div>
        <div className="usp-item">
          <img src={TransparentBilling} alt="Transparent Billing" />
          <p>Transparent Billing</p>
        </div>
        <div className="usp-item">
          <img src={VerifiedDrivers} alt="Verified Drivers" />
          <p>Verified Drivers</p>
        </div>
        <div className="usp-item">
          <img src={LiveGps} alt="Live GPS Tracking" />
          <p>Live GPS Tracking</p>
        </div>
      </div>
    </div>
  );
};

export default UniqueSellingPoint;

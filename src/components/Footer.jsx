import { Link } from "react-router-dom";
import AppLogo from "@/assets/images/app-logo.svg";
import "./css/footer.css";
import "./css/colors.css";
import PhoneIcon from "@/assets/icons/icon-phone-white.svg";
import LocationIcon from "@/assets/icons/icon-location-white.svg";
import EmailIcon from "@/assets/icons/icon-email-white.svg";
import { useRef } from "react";

const Footer = () => {
  const phone = useRef(6200944189);

  const makeCall = (e) => {
    e.stopPropagation();
    e.preventDefault();
    window.location.href = `tel:${phone.current}`;
  };

  const sendEmail = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const emailAddress = "ghoomlocabs@gmail.com";
    const subject = "Regarding GhoomLo Cabs";
    const body =
      "Hi GhoomLo Cabs team,\n\nI am writing to inquire about your services. \n\nKind regards,\n[Your Name]";

    const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  };

  const openLocationInGoogleMaps = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const latitude = 25.604;
    const longitude = 85.073;
    const zoom = 15;

    const mapsURL = `https://www.google.com/maps?q=${latitude},${longitude}&z=${zoom}`;

    window.location.href = mapsURL;
  };

  return (
    <div className="footer primary-background">
      <Link to="/">
        <img src={AppLogo} width="147.5px" height="44px" alt="App Logo" />
      </Link>
      <p className="white sub-title">
        One stop destination for all your travel needs
      </p>
      <p className="white contact-us">Contact us:</p>
      <div className="contact-details">
        <div className="contact-column" onClick={makeCall}>
          <img src={PhoneIcon} className="contact-icon" alt="Phone Icon" />
          <p className="white sub-title">+91-6200944189</p>
        </div>
        <div className="contact-column" onClick={openLocationInGoogleMaps}>
          <img
            src={LocationIcon}
            className="contact-icon"
            alt="Location Icon"
          />
          <p className="white sub-title">Jagdeo Path, Bailey Road, Patna-14</p>
        </div>
        <div className="contact-column" onClick={sendEmail}>
          <img src={EmailIcon} className="contact-icon" alt="Email Icon" />
          <p className="white sub-title">ghoomlocabs@gmail.com</p>
        </div>
      </div>

      <hr className="divider" />

      <p className="footer-copyright white sub-title">
        © 2023 All Rights Reserved By GhoomLo Cabs
      </p>
    </div>
  );
};

export default Footer;

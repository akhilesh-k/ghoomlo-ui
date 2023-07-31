import { Link } from "react-router-dom";
import AppLogo from "@/assets/images/app-logo.svg";
import "./css/footer.css";
import "./css/colors.css";

const Footer = () => {
  return (
    <div className="footer primary-background">
      <Link to="/">
        <img src={AppLogo} width="147.5px" height="44px" />
      </Link>
      <p className="white sub-title">
        One stop destination for all your travel needs
      </p>
      <p className="white contact-us">
        Contact us:
      </p>
      <div className="contact-details">
      </div>
    </div>
  )
}

export default Footer
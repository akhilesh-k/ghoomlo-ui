import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import IconClose from "@/assets/icons/icon-close.svg";
import HamBurger from "@/assets/icons/icon-hamburger-menu.svg";
import AppLogo from "@/assets/images/app-logo.svg";
import CallIcon from "@/assets/icons/icon-call.svg";
import "./css/header.css";
import "./css/colors.css";

const HamburgerMenuComp = () => {
  const [showMenu, setShowMenu] = useState(false);

  if (showMenu) {
    return (
      <div className="dropdown-container">
        <img
          src={IconClose}
          width="18px"
          height="18px"
          onClick={() => setShowMenu(false)}
        />
        <div className="dropdown"></div>
      </div>
    );
  } else {
    return (
      <img
        src={HamBurger}
        width="25.143px"
        height="20.354px"
        onClick={() => setShowMenu(true)}
      />
    );
  }
};

const CallPanel = ({ phoneNumber, makeCall }) => {
  return (
    <div className="panel" onClick={makeCall}>
      <img src={CallIcon} width="15px" height="16px" />
      <strong className="white">{phoneNumber}</strong>
    </div>
  );
};

const Header = () => {
  const phone = useRef(6200944189);

  const makeCall = (e) => {
    e.stopPropagation();
    e.preventDefault();
    window.location.href = `tel:${phone.current}`;
  };

  return (
    <nav className="primary-background">
      <ul>
        <li>
          <Link to="/">
            <img src={AppLogo} width="147.5px" height="44px" />
          </Link>
        </li>
        <li>
          <CallPanel phoneNumber={phone.current} makeCall={makeCall} />
        </li>
      </ul>
      {/* <HamburgerMenuComp /> */}
    </nav>
  );
};

export default Header;

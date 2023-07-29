import {
  useRef,
  useState
} from "react"
import { Link } from "react-router-dom"
import "./css/header.css"
import "./css/colors.css"

const HamburgerMenuComp = () => {
  const [showMenu, setShowMenu] = useState(false)
  
  if (showMenu) {
    return (
      <div className="dropdown-container">
        <img
          src="src/assets/icons/icon-close.svg"
          width="18px"
          height="18px"
          onClick={() => setShowMenu(false)}
        />
        <div className="dropdown">
        </div>
      </div>
    )
  } else {
    return (
      <img
        src="src/assets/icons/icon-hamburger-menu.svg"
        width="25.143px"
        height="20.354px"
        onClick={() => setShowMenu(true)}
      />
    )
  }
}

const CallPanel = ({ phoneNumber, makeCall }) => {
  return (
    <div
      className="panel"
      onClick={makeCall}
    >
      <img
        src="src/assets/icons/icon-call.svg"
        width="15px"
        height="16px"
      />
      <strong className="white">
        {phoneNumber}
      </strong>
    </div>
  )
}

const Header = () => {
  const phone = useRef(6200944189)

  const makeCall = (e) => {
    e.stopPropagation()
    e.preventDefault()
    window.location.href = `tel:${phone.current}`
  }

  return (
    <nav className="primary-background">
      <ul>
        <li>
          <Link to="/">
            <img
              src="src/assets/images/app-logo.svg"
              width="147.5px"
              height="44px"
            />
          </Link>
        </li>
        <li>
          <CallPanel
            phoneNumber={phone.current}
            makeCall={makeCall}
          />
        </li>
      </ul>
      <HamburgerMenuComp />
    </nav>
  )
}

export default Header
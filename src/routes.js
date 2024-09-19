import BookingPage from "./pages/BookingPage";
import AboutPage from "./pages/AboutPage";

const pages = [
  {
    path: "outstation-taxi/:fromCity-to-:toCity-cabs",
    component: BookingPage,
    exact: true,
  },
  {
    path: "/",
    component: BookingPage,
    exact: true,
  },
  {
    path: "/about-us",
    component: AboutPage,
    exact: true,
  },
];

export default pages;

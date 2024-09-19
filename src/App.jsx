import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import About from "./pages/AboutPage";
import Home from "./pages/BookingPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;

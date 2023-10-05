import { Routes, Route } from "react-router-dom";

import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FlightDetails from "./components/FlightDetails";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/flightdetails" element={<FlightDetails />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;

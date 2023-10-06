import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FlightDetails from "./components/FlightDetails";

const App = () => {
  const payload = useSelector((state) => state.flightPayload);

  const BlockRoute = ({ children }) => {
    if (Object.values(payload).every((val) => val === "")) {
      return <Navigate to="/" />;
    }

    return children;
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/flightdetails"
          element={
            <BlockRoute>
              <FlightDetails />
            </BlockRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;

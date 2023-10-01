import { Routes, Route } from "react-router-dom";

import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Navbar />
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;

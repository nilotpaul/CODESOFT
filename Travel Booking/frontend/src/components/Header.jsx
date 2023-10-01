import TwoWayFlight from "./Two-way";
import OneWayFlight from "./One-way";
import Button from "./Button";
import { useState } from "react";

import "react-day-picker/dist/style.css";
import styles from "../styles/header.module.css";

const Header = () => {
  const [isOneWayFlight, setIsOneWayFlight] = useState(false);

  return (
    <div className={styles.header}>
      <div className="container">
        <h2 className={styles.h2}>Navigating the Skies with Every Search.</h2>
        <div className={styles.options}>
          <Button
            onClick={() => setIsOneWayFlight(true)}
            id={isOneWayFlight ? styles.btn_active : ""}
          >
            One way
          </Button>
          <Button
            onClick={() => setIsOneWayFlight(false)}
            id={!isOneWayFlight ? styles.btn_active : ""}
          >
            Round Trip
          </Button>
        </div>
        {isOneWayFlight ? <OneWayFlight /> : <TwoWayFlight />}
      </div>
    </div>
  );
};

export default Header;

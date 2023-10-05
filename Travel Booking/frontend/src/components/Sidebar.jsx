import { CloudMoon, Coffee, Moon, Sun } from "lucide-react";

import styles from "../styles/flightDetails.module.css";

const Sidebar = ({ data }) => {
  const allCarriers = [];

  data?.forEach((airline) => {
    const carrsArr = airline.carrier.split(",");
    allCarriers.push(...carrsArr);
  });

  return (
    <div className={styles.sidebar}>
      <section className={styles.price}>
        <h3>Price in Rs</h3>
        <span>High to Low</span>
        <span>Low to High</span>
      </section>

      <section className={styles.departure}>
        <h3>Departure Time</h3>
        <div className={styles.departure_wrapper}>
          <div className={styles.child}>
            <Moon size={22} />
            <span>Before 6AM</span>
            <span>(Night)</span>
          </div>
          <div className={styles.child}>
            <Sun />
            <span>6AM - 12PM</span>
            <span>(Morning)</span>
          </div>
          <div className={styles.child}>
            <CloudMoon />
            <span>12PM - 6PM</span>
            <span>(Afternoon)</span>
          </div>
          <div className={styles.child}>
            <Coffee />
            <span>After 6PM</span>
            <span>(Evening)</span>
          </div>
        </div>
      </section>

      <section className={styles.airline}>
        <h3>Airline</h3>
        <div className={styles.child}>
          {[...new Set(allCarriers)].map((item, id) => (
            <span key={id}>{item}</span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Sidebar;

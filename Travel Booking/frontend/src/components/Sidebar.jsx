import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

import { CloudMoon, Coffee, Moon, Sun } from "lucide-react";
import Skeleton from "react-loading-skeleton";

import styles from "../styles/flightDetails.module.css";
import "react-loading-skeleton/dist/skeleton.css";

const Sidebar = ({
  data,
  isFetching,
  isSidebarOpen,
  setIsSidebarOpen,
  sidebarToggleRef,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sidebarRef = useRef(null);

  const price = searchParams?.get("price");
  const time = searchParams?.get("time");
  const airline = searchParams?.get("airline");

  const allCarriers = [];

  data?.forEach((airline) => {
    const carrsArr = airline.carrier.split(",");
    allCarriers.push(...carrsArr);
  });

  const onClickHandler = (key, value) => {
    searchParams.set(key.toString(), value.toString());
    setSearchParams(searchParams);
  };

  const onDoubleClickHandler = (key) => {
    searchParams.delete(key);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !sidebarRef?.current?.contains(e.target) &&
        !sidebarToggleRef?.current?.contains(e.target)
      ) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarRef, setIsSidebarOpen, sidebarToggleRef]);

  return (
    <div
      ref={sidebarRef}
      className={styles.sidebar}
      id={isSidebarOpen ? "" : styles.hidden}
    >
      <section className={styles.price}>
        <h3>Price in Rs</h3>
        <span
          id={price === "desc" ? styles.activeFilter : ""}
          onClick={() => onClickHandler("price", "desc")}
          onDoubleClick={() => onDoubleClickHandler("price")}
        >
          High to Low
        </span>
        <span
          id={price === "asc" ? styles.activeFilter : ""}
          onClick={() => onClickHandler("price", "asc")}
          onDoubleClick={() => onDoubleClickHandler("price")}
        >
          Low to High
        </span>
      </section>

      <section className={styles.departure}>
        <h3>Departure Time</h3>
        <div className={styles.departure_wrapper}>
          <div
            id={time === "night" ? styles.activeFilter : ""}
            className={styles.child}
            onClick={() => onClickHandler("time", "night")}
            onDoubleClick={() => onDoubleClickHandler("time")}
          >
            <Moon size={22} />
            <span>Before 6AM</span>
            <span>(Night)</span>
          </div>
          <div
            id={time === "morning" ? styles.activeFilter : ""}
            className={styles.child}
            onClick={() => onClickHandler("time", "morning")}
            onDoubleClick={() => onDoubleClickHandler("time")}
          >
            <Sun />
            <span>6AM - 12PM</span>
            <span>(Morning)</span>
          </div>
          <div
            id={time === "noon" ? styles.activeFilter : ""}
            className={styles.child}
            onClick={() => onClickHandler("time", "noon")}
            onDoubleClick={() => onDoubleClickHandler("time")}
          >
            <CloudMoon />
            <span>12PM - 6PM</span>
            <span>(Afternoon)</span>
          </div>
          <div
            id={time === "evening" ? styles.activeFilter : ""}
            className={styles.child}
            onClick={() => onClickHandler("time", "evening")}
            onDoubleClick={() => onDoubleClickHandler("time")}
          >
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
            <span
              id={airline === item.toLowerCase() ? styles.activeFilter : ""}
              key={id}
              onClick={() => onClickHandler("airline", item.toLowerCase())}
              onDoubleClick={() => onDoubleClickHandler("airline")}
            >
              {item}
            </span>
          ))}
          {isFetching && (
            <Skeleton
              count={3}
              height={32}
              width="100%"
              borderRadius="0.35rem"
              style={{
                margin: ".65rem 0",
                marginTop: "0",
                outline: "1px solid #ccc",
                position: "relative",
              }}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default Sidebar;

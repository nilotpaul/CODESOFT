import { useDispatch, useSelector } from "react-redux";
import { setPayload } from "../redux/slices/flightPayloadSlice";
import { useCreateOneWayFlightSearchMutation } from "../redux/api/flightPlacesSearchApi";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";

import Sidebar from "./Sidebar";
import DetailsHeader from "./DetailsHeader";
import Button from "./Button";

import styles from "../styles/flightDetails.module.css";
import { Info } from "lucide-react";

const FlightDetails = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const passedData = location?.state?.data;
  const payloadData = useSelector((state) => state.flightPayload);

  const [mutate, { isLoading, error, data: flightDetails }] =
    useCreateOneWayFlightSearchMutation();

  useEffect(() => {
    async function getFlightData() {
      if (!payloadData) {
        dispatch(setPayload(passedData));
      }

      await mutate(payloadData);
    }

    getFlightData();
  }, [payloadData, mutate, dispatch, passedData]);

  console.log(flightDetails);

  return (
    <>
      <DetailsHeader data={passedData} />
      <div className={`container ${styles.main}`}>
        <Sidebar data={flightDetails} />
        <div className={styles.flightDetails}>
          {flightDetails?.map((flight, id) => {
            const img = flight.carrierImg;
            const name = flight.carrier;
            const departure = format(
              new Date(flight.info.dd),
              "hh:mm aaa"
            ).toUpperCase();
            const arrival = format(
              new Date(flight.info.ad),
              "hh:mm aaa"
            ).toUpperCase();

            return (
              <div key={id} className={styles.tickets}>
                <div className={styles.child}>
                  <img src={img} width={35} height={35} alt={name} />
                  <div className={styles.info}>
                    <span>
                      {departure} - {arrival}
                    </span>
                    <span>
                      {flight.info.da} - {flight.info.aa}, {flight.carrier}
                    </span>
                  </div>
                  <span id={styles.price}>{flight.prices[0].pr.dp}</span>
                </div>
                <Button>Book Now</Button>
              </div>
            );
          })}
        </div>
        <div className={styles.disclaimer}>
          <Info />
          <p>
            Price data are directly fetched from an unofficial tripadvisor.com
            api, prices may or maynot be accurate. This project is just for
            internship purpose, not intended to harm any policies.
          </p>
        </div>
      </div>
    </>
  );
};

export default FlightDetails;

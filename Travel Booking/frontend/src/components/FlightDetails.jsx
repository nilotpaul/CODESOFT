import { useRef, useState } from "react";
import { useCreateOneWayFlightSearchQuery } from "../redux/api/flightPlacesSearchApi";
import { useCreatePaymentSessionMutation } from "../redux/api/paymentApi";
import { onOpen } from "../redux/slices/authModalSlice";
import { resetPayload } from "../redux/slices/flightPayloadSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import Skeleton from "react-loading-skeleton";
import { ClipLoader } from "react-spinners";
import { toast } from "react-hot-toast";

import Sidebar from "./Sidebar";
import DetailsHeader from "./DetailsHeader";
import Button from "./Button";
import { Info, SlidersHorizontal } from "lucide-react";

import styles from "../styles/flightDetails.module.css";
import "react-loading-skeleton/dist/skeleton.css";

const FlightDetails = () => {
  const [searchParams] = useSearchParams();
  const [mutate] = useCreatePaymentSessionMutation();
  const [flightLoading, setFlightLoading] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarToggleRef = useRef(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const payloadData = useSelector((state) => state.flightPayload);

  const { isAuthenticated } = useSelector((state) => state.userSlice);
  const passedData = location?.state?.data;

  const {
    currentData: flightDetails,
    isFetching,
    isLoading,
    error,
  } = useCreateOneWayFlightSearchQuery(payloadData || passedData);

  if (isFetching || isLoading || !flightDetails) {
    return (
      <>
        <DetailsHeader data={payloadData} />
        <div className={`container ${styles.main}`}>
          <Sidebar data={flightDetails} isFetching={isFetching} />
          <Skeleton
            count={12}
            height={130}
            width={650}
            borderRadius="0.35rem"
            baseColor="white"
            highlightColor="#f1f1f1"
            style={{
              margin: "0.75rem 0",
              marginTop: "0",
              outline: "1px solid #ccc",
              position: "relative",
            }}
          />
          <div className={styles.flightDetails}>
            {error && (
              <span>Something went wrong. Please try again later.</span>
            )}
          </div>
        </div>
      </>
    );
  }

  const price = searchParams?.get("price");
  const time = searchParams?.get("time");
  const airline = searchParams?.get("airline");

  const filteredFlights = [...flightDetails]
    ?.sort((a, b) => {
      const sortedPrice =
        price === "asc"
          ? a.prices.pr.p - b.prices.pr.p
          : price === "desc"
          ? b.prices.pr.p - a.prices.pr.p
          : a.prices.pr.p - b.prices.pr.p;

      return sortedPrice;
    })
    ?.filter((item) => {
      const departTime = format(
        new Date(item.info.dd),
        "hh:mm:aaa"
      ).toUpperCase();

      const filteredDept =
        time === "night"
          ? departTime < "06:00:AM"
          : time === "morning"
          ? departTime >= "06:00:AM" || departTime <= "12:00:PM"
          : time === "noon"
          ? departTime >= "12:00:PM" || departTime <= "06:00:PM"
          : time === "evening"
          ? departTime >= "06:00:PM"
          : item;

      return filteredDept;
    })
    ?.filter((item) => {
      const filteredCarrier = airline
        ?.toLowerCase()
        ?.includes(item.carrier?.toLowerCase());

      return filteredCarrier ?? item;
    });

  const stripePaymentMutation = async (price, name, flightId) => {
    if (!isAuthenticated) {
      dispatch(onOpen());
      return;
    }

    const formatedPrice = price?.toString()?.replace("₹", "")?.replace(",", "");

    const payload = {
      price: formatedPrice,
      name,
    };

    try {
      const updatedLoading = [...flightLoading];
      updatedLoading[flightId] = true;
      setFlightLoading(updatedLoading);

      const res = await mutate(payload).unwrap();

      dispatch(resetPayload());
      window.location.href = res?.url;
    } catch (err) {
      console.error(err);

      if (err && err?.data?.message) {
        toast.error(err?.data?.message);
      } else {
        toast.error("Something went wrong. please try again later.");
      }
    } finally {
      const updatedLoading = [...flightLoading];
      updatedLoading[flightId] = false;
      setFlightLoading(updatedLoading);
    }
  };

  return (
    <>
      <DetailsHeader data={payloadData} />
      <div className={`container ${styles.main}`}>
        <Sidebar
          data={flightDetails}
          isFetching={isFetching}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          sidebarToggleRef={sidebarToggleRef}
        />
        <SlidersHorizontal
          ref={sidebarToggleRef}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          id={styles.filter_ico}
          size={44}
        />
        {isFetching ||
          (isLoading && (
            <Skeleton
              count={12}
              height={130}
              width={650}
              borderRadius="0.35rem"
              baseColor="white"
              highlightColor="#f1f1f1"
              style={{
                margin: "0.75rem 0",
                marginTop: "0",
                outline: "1px solid #ccc",
                position: "relative",
              }}
            />
          ))}
        <div className={styles.flightDetails}>
          {filteredFlights?.map((flight, id) => {
            const img = flight?.carrierImg;
            const name = flight?.carrier;
            const departure = format(
              new Date(flight?.info?.dd),
              "hh:mm aaa"
            ).toUpperCase();
            const arrival = format(
              new Date(flight?.info?.ad),
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
                      {flight?.info?.da} - {flight?.info?.aa}, {flight?.carrier}
                    </span>
                  </div>
                  <span id={styles?.price}>{flight?.prices?.pr?.dp}</span>
                </div>
                <Button
                  onClick={() =>
                    stripePaymentMutation(
                      flight?.prices?.pr?.dp,
                      `${payloadData?.adult} adult(s), ${payloadData?.children} children(s)`,
                      id
                    )
                  }
                >
                  Book Now
                  {flightLoading[id] && <ClipLoader color="red" size={18} />}
                </Button>
              </div>
            );
          })}
          {filteredFlights?.length === 0 && <span>No flights available!</span>}
          {error && <span>Something went wrong. Please try again later.</span>}
        </div>
        {filteredFlights?.length !== 0 && !error && (
          <div className={styles.disclaimer}>
            <Info />
            <p>
              Price data are directly fetched from an unofficial tripadvisor.com
              api, prices may or maynot be accurate. This project is just for
              internship purpose, not intended to harm any policies.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default FlightDetails;

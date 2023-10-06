import Input from "./Input";
import PopUp from "./PopUp";
import { CalendarDays } from "lucide-react";
import Button from "./Button";
import TraverllersSelect from "./TraverllersSelect";

import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setPayload } from "../redux/slices/flightPayloadSlice";
import { DayPicker } from "react-day-picker";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchQuerySelect from "./SearchQuerySelect";
import useDebounce from "../hooks/useDebounce";
import { format } from "date-fns";

import styles from "../styles/oneWay.module.css";

const OneWayFlight = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [departDate, setDepartDate] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const [isQueryOpen, setIsQueryOpen] = useState(false);
  const [isTQueryOpen, setIsTQueryOpen] = useState(false);
  const fRef = useRef(null);
  const tRef = useRef(null);

  const debouncedFValue = useDebounce(searchParams?.get("f"), 2000);
  const debouncedTValue = useDebounce(searchParams?.get("t"), 2000);

  const date = format(departDate ?? new Date(), "yyyy-MM-dd");

  const sendToBooking = () => {
    const payload = {
      type: "one",
      from: searchParams?.get("f").trim() ?? "",
      to: searchParams?.get("t").trim() ?? "",
      depart:
        date.toString() === format(new Date(), "yyyy-MM-dd")
          ? ""
          : date?.toString()?.trim(),
      adult: searchParams?.get("adult").trim() ?? "",
      children: searchParams?.get("children").trim() ?? "",
    };

    navigate("/flightdetails", { state: { data: payload } });
    dispatch(setPayload(payload));
  };

  return (
    <>
      <div className={styles.header_section}>
        <div className={styles.child}>
          <span>From</span>
          <Input
            ref={fRef}
            onClick={() => {
              setIsQueryOpen(true);
              fRef?.current?.focus();
            }}
            value={searchParams?.get("f") ?? ""}
            onChange={(e) => {
              searchParams.set("f", e.target.value);
              setSearchParams(searchParams);
            }}
            type="text"
            placeholder="Country, City or Airport"
          />
          {debouncedFValue && (
            <SearchQuerySelect
              query={debouncedFValue}
              isQueryOpen={isQueryOpen}
              setIsQueryOpen={setIsQueryOpen}
              search="f"
              inputRef={fRef}
            />
          )}
        </div>
        <div className={styles.child}>
          <span>To</span>
          <Input
            ref={tRef}
            value={searchParams?.get("t") ?? ""}
            onClick={() => {
              setIsTQueryOpen(true);
              tRef?.current?.focus();
            }}
            onChange={(e) => {
              searchParams.set("t", e.target.value);
              setSearchParams(searchParams);
            }}
            type="text"
            placeholder="Country, City or Airport"
          />
          {debouncedTValue && (
            <SearchQuerySelect
              query={debouncedTValue}
              isQueryOpen={isTQueryOpen}
              setIsQueryOpen={setIsTQueryOpen}
              search="t"
              inputRef={tRef}
            />
          )}
        </div>
        <div className={styles.child}>
          <span>Depart</span>
          <PopUp
            trigger={
              <div id={styles.picker}>
                <Input
                  type="text"
                  placeholder="Depart Date"
                  value={date === format(new Date(), "yyyy-MM-dd") ? "" : date}
                />
                <CalendarDays size={20} />
              </div>
            }
          >
            <DayPicker
              mode="single"
              selected={departDate}
              onSelect={setDepartDate}
            />
          </PopUp>
        </div>
        <div className={styles.child}>
          <TraverllersSelect />
        </div>
      </div>
      <Button onClick={sendToBooking} className={styles.search_btn}>
        Search
      </Button>
    </>
  );
};

export default OneWayFlight;

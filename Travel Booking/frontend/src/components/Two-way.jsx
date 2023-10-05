import Input from "./Input";
import PopUp from "./PopUp";
import { CalendarDays } from "lucide-react";
import Button from "./Button";
import SearchQuerySelect from "./SearchQuerySelect";
import TraverllersSelect from "./TraverllersSelect";

import { useSearchParams } from "react-router-dom";
import { useRef, useState } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import useDebounce from "../hooks/useDebounce";

import styles from "../styles/twoWay.module.css";

const TwoWayFlight = () => {
  const [departDate, setDepartDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const [isQueryOpen, setIsQueryOpen] = useState(false);
  const [isTQueryOpen, setIsTQueryOpen] = useState(false);
  const fRef = useRef(null);
  const tRef = useRef(null);

  const debouncedFValue = useDebounce(searchParams?.get("f"), 1500);
  const debouncedTValue = useDebounce(searchParams?.get("t"), 1500);

  const date1 = format(departDate ?? new Date(), "dd-MM-yyyy");
  const date2 = format(returnDate ?? new Date(), "dd-MM-yyyy");

  const sendToBooking = () => {
    const payload = {
      from: searchParams?.get("f")?.trim() ?? "",
      to: searchParams?.get("t")?.trim() ?? "",
      depart:
        date1.toString() === format(new Date(), "dd-MM-yyyy")
          ? ""
          : date1?.toString()?.trim(),
      return:
        date2.toString() === format(new Date(), "dd-MM-yyyy")
          ? ""
          : date2?.toString()?.trim(),
      adult: searchParams?.get("adult")?.trim() ?? "",
      children: searchParams?.get("children")?.trim() ?? "",
    };

    for (const key in payload) {
      if (payload[key] === "") return;
    }

    console.log(payload);
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
          <div className={styles.child_inside}>
            <PopUp
              trigger={
                <div id={styles.picker}>
                  <Input
                    type="text"
                    placeholder="Depart Date"
                    value={
                      date1 === format(new Date(), "dd-MM-yyyy") ? "" : date1
                    }
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
        </div>
        <div className={styles.child}>
          <span>Return</span>
          <PopUp
            trigger={
              <div id={styles.picker}>
                <Input
                  type="text"
                  placeholder="Return Date"
                  value={
                    date2 === format(new Date(), "dd-MM-yyyy") ? "" : date2
                  }
                />
                <CalendarDays size={20} />
              </div>
            }
          >
            <DayPicker
              mode="single"
              selected={returnDate}
              onSelect={setReturnDate}
            />
          </PopUp>
        </div>
        <div className={styles.child}>
          <TraverllersSelect sendToBooking={sendToBooking} />
        </div>
      </div>
      <Button onClick={sendToBooking} className={styles.search_btn}>
        Search
      </Button>
    </>
  );
};

export default TwoWayFlight;

import Input from "./Input";
import PopUp from "./PopUp";
import { CalendarDays, Minus, Plus } from "lucide-react";
import Select from "./Select";
import Button from "./Button";
import { PopoverClose } from "@radix-ui/react-popover";

import { useState } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";

import styles from "../styles/twoWay.module.css";

const TwoWayFlight = () => {
  const [departDate, setDepartDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [adultsQty, setAdultsQty] = useState(0);
  const [childrenQty, setChildrenQty] = useState(0);

  const selectAge = [];
  for (let i = 0; i <= 15; i++) {
    selectAge.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }

  // console.log(departDate && format(departDate, "dd-MM-yyyy").split("-"));

  return (
    <>
      <div className={styles.header_section}>
        <div className={styles.child}>
          <span>From</span>
          <Input type="text" placeholder="Country, City or Airport" />
        </div>
        <div className={styles.child}>
          <span>To</span>
          <Input type="text" placeholder="Country, City or Airport" />
        </div>
        <div className={styles.child}>
          <span>Depart</span>
          <div className={styles.child_inside}>
            <PopUp
              trigger={
                <div id={styles.picker}>
                  <Input type="text" placeholder="Depart Date" />
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
                <Input type="text" placeholder="Return Date" />
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
          <span>Travellers and Cabin Class</span>
          <PopUp
            className={styles.cabin}
            trigger={<Input type="text" placeholder="not input" />}
          >
            <h3>Cabin Class</h3>
            <p id={styles.ghost_text}>
              Prices data are fetched directly from skyscanner.co.in, details
              may or maynot be accurate.
            </p>
            <section className={styles.count}>
              <div className={styles.count_left}>
                <span>Adults</span>
                <span>Aged 16+</span>
              </div>
              <div className={styles.right}>
                <Button
                  onClick={() =>
                    adultsQty > 0 && adultsQty <= 8
                      ? setAdultsQty(adultsQty - 1)
                      : null
                  }
                >
                  <Minus size={20} />
                </Button>
                <span>{adultsQty}</span>
                <Button
                  onClick={() =>
                    adultsQty >= 0 && adultsQty < 8
                      ? setAdultsQty(adultsQty + 1)
                      : null
                  }
                >
                  <Plus size={20} />
                </Button>
              </div>
            </section>
            <section className={styles.count}>
              <div className={styles.count_left}>
                <span>Children</span>
                <span>Aged 0 to 15</span>
              </div>
              <div className={styles.right}>
                <Button
                  onClick={() =>
                    childrenQty > 0 && childrenQty <= 8
                      ? setChildrenQty(childrenQty - 1)
                      : null
                  }
                >
                  <Minus size={20} />
                </Button>
                <span>{childrenQty}</span>
                <Button
                  onClick={() =>
                    childrenQty >= 0 && childrenQty < 8
                      ? setChildrenQty(childrenQty + 1)
                      : null
                  }
                >
                  <Plus size={20} />
                </Button>
              </div>
            </section>
            <div className={styles.child_age}>
              <span>Age of child 1</span>
              <Select>{selectAge}</Select>
            </div>
            <p id={styles.ghost_text}>
              Make sure to check all inputs correctly, airlines have
              restrictions on under 18s
            </p>
            <PopoverClose asChild>
              <Button className={styles.btn}>Done</Button>
            </PopoverClose>
          </PopUp>
        </div>
      </div>
      <Button className={styles.search_btn}>Search</Button>
    </>
  );
};

export default TwoWayFlight;

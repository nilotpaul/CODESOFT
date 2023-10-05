import { useState } from "react";

import { Minus, Plus } from "lucide-react";
import Button from "./Button";
import PopUp from "./PopUp";
import { PopoverClose } from "@radix-ui/react-popover";
import Input from "./Input";
import { useSearchParams } from "react-router-dom";

import styles from "../styles/oneWay.module.css";

const TraverllersSelect = () => {
  const [adultsQty, setAdultsQty] = useState(0);
  const [childrenQty, setChildrenQty] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();

  const adult = searchParams?.get("adult");
  const children = searchParams?.get("children");

  const payloadData = { adults: adultsQty, children: childrenQty };

  const handleClick = () => {
    searchParams.set("adult", payloadData.adults);
    searchParams.set("children", payloadData.children);
    setSearchParams(searchParams);
  };

  return (
    <div>
      <span>Travellers and Cabin Class</span>
      <PopUp
        className={styles.cabin}
        trigger={
          <Input
            value={
              adult || children
                ? [`adults: ${adult}`, `children: ${children}`]
                : ""
            }
            type="text"
            placeholder="Traverlls Info"
            style={{ width: "100%" }}
          />
        }
      >
        <h3>Cabin Class</h3>
        <p id={styles.ghost_text}>
          Prices data are fetched directly from skyscanner.co.in, details may or
          maynot be accurate.
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

        <p id={styles.ghost_text}>
          Make sure to check all inputs correctly, airlines have restrictions on
          under 18s
        </p>
        <PopoverClose asChild>
          <Button onClick={handleClick} className={styles.btn}>
            Done
          </Button>
        </PopoverClose>
      </PopUp>
    </div>
  );
};

export default TraverllersSelect;

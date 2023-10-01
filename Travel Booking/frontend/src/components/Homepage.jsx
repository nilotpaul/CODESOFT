import {
  BadgeIndianRupee,
  Contact,
  PercentCircle,
  ShieldCheck,
} from "lucide-react";
import { url } from "../utils/cloudinaryUrl";

import styles from "../styles/homepage.module.css";

const Homepage = () => {
  const logos = [
    "/airAsia.jpg",
    "/airFrance.jpg",
    "/airIndia.jpg",
    "/britishAirways.jpg",
    "/emirates.jpg",
    "/indigo.jpg",
    "singaporeAirlines.jpg",
    "spicejet.jpg",
    "/vistara.jpg",
  ];

  return (
    <div className={styles.home}>
      <section className={styles.promises}>
        <div className={styles.child}>
          <ShieldCheck size={40} />
          <span>100% Secure Payments</span>
        </div>
        <div className={styles.child}>
          <Contact size={42} />
          <span>24/7 Customer Support</span>
        </div>
        <div className={styles.child}>
          <BadgeIndianRupee size={64} />
          <span>Cheap Tickets + Additional Discount</span>
        </div>
        <div className={styles.child}>
          <PercentCircle size={56} />
          <span>Special Offers on over 100+ airlines</span>
        </div>
      </section>

      <section className={styles.card}>
        <h2>Popular Domestic Flight Routes</h2>
        <div className={styles.wrapper}>
          <div className={styles.child}>
            <img
              src={url + "/ticket-booking/1a570f88b0a22ad38764af9a8977e6a4"}
              width={3456}
              height={3456}
              alt="Mumbai to Delhi"
            />
            <div className={styles.info}>
              <span>Delhi ( DEL )</span>
              <span>Via: Mumbai ( BOM )</span>
            </div>
          </div>
          <div className={styles.child}>
            <img
              src={url + "/ticket-booking/d103a83239dd2e5e07aa289f32ae5461"}
              width={4000}
              height={6000}
              alt="Kolkata to Mumbai"
            />
            <div className={styles.info}>
              <span>Mumbai ( BOM )</span>
              <span>Via: Kolkata ( CCU )</span>
            </div>
          </div>
          <div className={styles.child}>
            <img
              src={url + "/ticket-booking/997b05f2230917019c71e4e2f90ed4cf"}
              width={2421}
              height={3227}
              alt="Delhi to Goa"
            />
            <div className={styles.info}>
              <span>Goa ( GOI )</span>
              <span>Via: Delhi ( DEL )</span>
            </div>
          </div>
          <div className={styles.child}>
            <img
              src={url + "/ticket-booking/5e16af633bdf3d83f0a0df48e8da930b"}
              width={4032}
              height={3024}
              alt="Bengaluru to Delhi"
            />
            <div className={styles.info}>
              <span>Delhi ( DEL )</span>
              <span>Via: Bengaluru ( BLR )</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.card}>
        <h2>Popular International Flight Routes</h2>
        <div className={styles.wrapper}>
          <div className={styles.child}>
            <img
              src={url + "/ticket-booking/174d73e6bc2dfbb4b04f22b289ae9d58"}
              width={3456}
              height={3456}
              alt="Dubai to Delhi"
            />
            <div className={styles.info}>
              <span>Delhi ( DEL )</span>
              <span>Via: Dubai ( DXB )</span>
            </div>
          </div>
          <div className={styles.child}>
            <img
              src={url + "/ticket-booking/b1c1f91f717756cf4a725bd8da827c33"}
              width={4000}
              height={6000}
              alt="Singapore to Delhi"
            />
            <div className={styles.info}>
              <span>Delhi ( DEL )</span>
              <span>Via: Singapore ( SIN )</span>
            </div>
          </div>
          <div className={styles.child}>
            <img
              src={url + "/ticket-booking/98fec2abd7143dc19d3296d0fb61aa2a"}
              width={2421}
              height={3227}
              alt="London to Delhi"
            />
            <div className={styles.info}>
              <span>Delhi ( DEL )</span>
              <span>Via: London ( LHR )</span>
            </div>
          </div>
          <div className={styles.child}>
            <img
              src={url + "/ticket-booking/cce185ee80413866da3716e29b557a10"}
              width={4032}
              height={3024}
              alt="Colombo to Delhi"
            />
            <div className={styles.info}>
              <span>Delhi ( DEL )</span>
              <span>Via: COLOMBO ( CLB )</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.scroller} data-animated="true">
        <div className={styles.container}>
          {logos.map((img, id) => (
            <img key={id} src={img} alt={img} width={300} height={160} />
          ))}
          {logos.map((img, id) => (
            <img key={id} src={img} alt={img} width={300} height={160} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Homepage;

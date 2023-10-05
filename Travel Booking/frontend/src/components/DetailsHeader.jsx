import styles from "../styles/flightDetails.module.css";

const DetailsHeader = ({ data }) => {
  return (
    <div className={styles.header}>
      <div className={`container ${styles.header_inside}`}>
        <h3>Showing results for :</h3>
        <div className={styles.wrapper}>
          <div className={styles.child}>
            <span>From</span>
            <span>{data?.from}</span>
          </div>
          <div className={styles.child}>
            <span>To</span>
            <span>{data?.to}</span>
          </div>
          <div className={styles.child}>
            <span>Date</span>
            <span>{data?.depart}</span>
          </div>
          {data?.return && (
            <div className={styles.child}>
              <span>Return</span>
              <span>{data?.return}</span>
            </div>
          )}
          <div className={styles.child}>
            <span>Travellers</span>
            <span>
              {data?.adult} adult(s), {data?.children} children(s)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsHeader;

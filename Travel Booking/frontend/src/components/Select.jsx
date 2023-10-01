import { forwardRef } from "react";

import styles from "../styles/select.module.css";

const Select = forwardRef(({ children, className, ...props }, ref) => {
  return (
    <select
      ref={ref}
      {...props}
      className={`${styles.select} ${className ?? ""}`}
    >
      {children}
    </select>
  );
});

Select.displayName = "Select";

export default Select;

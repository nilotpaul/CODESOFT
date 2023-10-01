import { forwardRef } from "react";

import styles from "../styles/input.module.css";

const Input = forwardRef(({ children, className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className={`${styles.input} ${className ?? ""}`}
    >
      {children}
    </input>
  );
});

Input.displayName = "Input";

export default Input;

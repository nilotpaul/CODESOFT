import { forwardRef } from "react";

import styles from "../styles/button.module.css";

const Button = forwardRef(({ children, className, ...props }, ref) => {
  return (
    <button ref={ref} {...props} className={`${styles.button} ${className}`}>
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;

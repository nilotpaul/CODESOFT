import * as Popover from "@radix-ui/react-popover";

import styles from "../styles/popUp.module.css";

const PopUp = ({ trigger, children, className, ...props }) => {
  return (
    <Popover.Root {...props}>
      <Popover.Trigger className={styles.trigger}>{trigger}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className={`${styles.content} ${className ? className : ""}`}
        >
          {children}
          <Popover.Arrow className={styles.arrow} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default PopUp;

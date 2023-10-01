import * as Dialog from "@radix-ui/react-dialog";

import { X } from "lucide-react";
import styles from "../styles/modal.module.css";

const Modal = ({ isOpen, onChange, title, desc, children }) => {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content}>
          <Dialog.Title className={styles.title}>
            {title}
            <Dialog.Close className={styles.close} asChild>
              <X size={19} />
            </Dialog.Close>
          </Dialog.Title>
          <Dialog.Description>{desc}</Dialog.Description>
          <div className={styles.children}>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;

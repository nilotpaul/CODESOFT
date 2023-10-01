import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

import styles from "../styles/footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footer_inside}`}>
        <span>
          Copyright &copy; {new Date().getFullYear()} BrandName. All Rights
          Reserved
        </span>
        <div className={styles.links}>
          <Facebook size={20} id={styles.icon} strokeWidth={0} />
          <Instagram size={20} id={styles.icon} />
          <Twitter size={20} id={styles.icon} strokeWidth={0} />
          <Linkedin size={20} id={styles.icon} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

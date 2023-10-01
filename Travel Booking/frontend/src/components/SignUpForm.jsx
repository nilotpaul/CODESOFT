import Input from "./Input";
import Button from "./Button";

import styles from "../styles/authForm.module.css";

const SignUpForm = ({ isSignInForm, setIsSignInForm }) => {
  return (
    <form className={styles.form}>
      <div className={styles.child}>
        <label>Name</label>
        <Input placeholder="name" type="text" />
      </div>
      <div className={styles.child}>
        <label>Email</label>
        <Input placeholder="email" type="text" />
      </div>
      <div className={styles.child}>
        <label>Password</label>
        <Input placeholder="password" type="password" />
      </div>
      <div className={styles.child}>
        <label>Confirm Password</label>
        <Input placeholder="confirm password" type="password" />
      </div>
      <div className={`${styles.child} ${styles.button}`}>
        <Button type="submit">Sign Up</Button>
      </div>
      <span className={styles.down}>
        already have an account?{" "}
        <span onClick={() => setIsSignInForm(!isSignInForm)}>SignIn</span>
      </span>
    </form>
  );
};

export default SignUpForm;

import { onOpen } from "../redux/slices/authModalSlice";
import { logout } from "../redux/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Button from "../components/Button";
import { ChevronDown, PlaneTakeoff, UserCircle } from "lucide-react";
import PopUp from "./PopUp";

import styles from "../styles/navbar.module.css";

const Navbar = () => {
  const { user, isAuthenticated } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <nav className={styles.nav}>
      <div className={`container ${styles.navbar}`}>
        <Link to="/" className={styles.brand}>
          <PlaneTakeoff size={36} />
          <span>BrandName</span>
        </Link>
        <div className={styles.login}>
          {!isAuthenticated ? (
            <Button onClick={() => dispatch(onOpen())}>
              <UserCircle />
              SignIn
            </Button>
          ) : (
            <PopUp
              trigger={
                <span id={styles.popup}>
                  Welcome, {user.name} <ChevronDown size={16} />
                </span>
              }
            >
              <Button
                onClick={() => {
                  dispatch(logout());
                  navigate(0);
                }}
                style={{ width: "100%", outline: "0" }}
              >
                SignOut
              </Button>
            </PopUp>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

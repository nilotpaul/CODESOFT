import Modal from "./Modal";
import { useSelector, useDispatch } from "react-redux";
import { onClose } from "../redux/slices/authModalSlice";
import { useState } from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

const AuthModal = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  return isSignInForm ? (
    <SignIn isSignInForm={isSignInForm} setIsSignInForm={setIsSignInForm} />
  ) : (
    <SignUp isSignInForm={isSignInForm} setIsSignInForm={setIsSignInForm} />
  );
};

const SignUp = ({ isSignInForm, setIsSignInForm }) => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.authModalSlice);

  const onChange = (open) => {
    if (!open) dispatch(onClose());
  };

  return (
    <Modal
      title="Create An Account"
      desc="Signup to continue booking!"
      isOpen={isOpen}
      onChange={onChange}
    >
      <SignUpForm
        isSignInForm={isSignInForm}
        setIsSignInForm={setIsSignInForm}
      />
    </Modal>
  );
};

const SignIn = ({ isSignInForm, setIsSignInForm }) => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.authModalSlice);

  const onChange = (open) => {
    if (!open) dispatch(onClose());
  };

  return (
    <Modal
      title="Signin to BrandName"
      desc="welcome back!"
      isOpen={isOpen}
      onChange={onChange}
    >
      <SignInForm
        isSignInForm={isSignInForm}
        setIsSignInForm={setIsSignInForm}
      />
    </Modal>
  );
};

export default AuthModal;

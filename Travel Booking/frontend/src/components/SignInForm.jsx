import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./Input";
import Button from "./Button";
import { toast } from "react-hot-toast";
import { useLoginUserMutation } from "../redux/api/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import { onClose } from "../redux/slices/authModalSlice";

import styles from "../styles/authForm.module.css";

const SignInForm = ({ isSignInForm, setIsSignInForm }) => {
  const [signInMutation, { error }] = useLoginUserMutation();
  const dispatch = useDispatch();

  const signInSchema = z.object({
    email: z.string().email().nonempty({ message: "invalid email" }),
    password: z.string().min(4, { message: "must be more than 6 characters" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const onSubmitFn = async (formData) => {
    try {
      const res = await signInMutation(formData).unwrap();
      dispatch(setUser(res));

      if (!error) dispatch(onClose());
    } catch (err) {
      console.error(err);
      toast.error(err.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitFn)} className={styles.form}>
      <div className={styles.child}>
        <label>Email</label>
        <Input placeholder="email" type="text" {...register("email")} />
        <span className={styles.errs}>{errors.email?.message}</span>
      </div>
      <div className={styles.child}>
        <label>Password</label>
        <Input
          placeholder="password"
          type="password"
          {...register("password")}
        />
        <span className={styles.errs}>{errors.password?.message}</span>
      </div>
      <div className={`${styles.child} ${styles.button}`}>
        <Button type="submit">{isSubmitting ? "Sign In..." : "Sign In"}</Button>
      </div>
      <span className={styles.down}>
        don&apos;t have an account?{" "}
        <span onClick={() => setIsSignInForm(!isSignInForm)}>SignUp</span>
      </span>
    </form>
  );
};

export default SignInForm;

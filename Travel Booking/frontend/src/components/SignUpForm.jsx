import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterUserMutation } from "../redux/api/authApi";
import { useDispatch } from "react-redux";
import { onClose } from "../redux/slices/authModalSlice";
import { setUser } from "../redux/slices/userSlice";
import { ClipLoader } from "react-spinners";
import { toast } from "react-hot-toast";
import * as z from "zod";

import Input from "./Input";
import Button from "./Button";

import styles from "../styles/authForm.module.css";

const SignUpForm = ({ isSignInForm, setIsSignInForm }) => {
  const dispatch = useDispatch();

  const [signUpMutation, { error }] = useRegisterUserMutation();

  const signInSchema = z
    .object({
      name: z.string().nonempty({ message: "cannot be empty" }),
      email: z.string().email().nonempty({ message: "invalid email" }),
      password: z
        .string()
        .min(4, { message: "must be more than 6 characters" }),
      confirmp: z
        .string()
        .min(4, { message: "must be more than 6 characters" }),
    })
    .refine(({ password, confirmp }) => password === confirmp, {
      message: "Invalid credentials",
      path: ["confirmp"],
    });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const onSubmitFn = async (formData) => {
    try {
      const res = await signUpMutation(formData).unwrap();
      dispatch(setUser(res));

      if (!error) {
        reset();
        dispatch(onClose());
      }
    } catch (err) {
      console.error(err);

      if (err && err?.data?.message) {
        toast.error(err.data.message);
      } else {
        toast.error("Something went wrong. Please try again later");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitFn)} className={styles.form}>
      <div className={styles.child}>
        <label>Name</label>
        <Input placeholder="name" type="text" {...register("name")} />
        {errors.name?.message && (
          <span className={styles.errs}>{errors.name?.message}</span>
        )}
      </div>
      <div className={styles.child}>
        <label>Email</label>
        <Input placeholder="email" type="text" {...register("email")} />
        {errors.email?.message && (
          <span className={styles.errs}>{errors.email?.message}</span>
        )}
      </div>
      <div className={styles.child}>
        <label>Password</label>
        <Input
          placeholder="password"
          type="password"
          {...register("password")}
        />
        {errors.password?.message && (
          <span className={styles.errs}>{errors.password?.message}</span>
        )}
      </div>
      <div className={styles.child}>
        <label>Confirm Password</label>
        <Input
          placeholder="confirm password"
          type="password"
          {...register("confirmp")}
        />
        {errors.confirmp?.message && (
          <span className={styles.errs}>{errors.confirmp?.message}</span>
        )}
      </div>
      <div className={`${styles.child} ${styles.button}`}>
        <Button type="submit">
          Sign Up {isSubmitting && <ClipLoader color="white" size={18} />}
        </Button>
      </div>
      <span className={styles.down}>
        already have an account?{" "}
        <span onClick={() => setIsSignInForm(!isSignInForm)}>SignIn</span>
      </span>
    </form>
  );
};

export default SignUpForm;

import { object, string, ref } from "yup";

export const userSchema = object({
  email: string().email().required().label("Email"),
  name: string().required().label("Name"),
  password: string().min(8, "Password must be at least 8 characters long").required().label("Password"),
  confirmPassword: string().oneOf([ref("password"), null], "Passwords must match"),
});

export const userSignIn = object({
  email: string().email().required().label("Email"),
  password: string().required().label("Password"),
});

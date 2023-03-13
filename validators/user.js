import { object, string, ref } from "yup";

export const userSignupForm = object({
  email: string().email().required().label("Email"),
  name: string().required().label("Name"),
  //postal_code: string().email().required().label("Postal Code"),
  //phone_number: string().required().label("Phone Number"),
  password: string().min(8, "Password must be at least 8 characters long").required().label("Password"),
  confirmPassword: string().oneOf([ref("password"), null], "Passwords must match"),
});

export const userSignInForm = object({
  email: string().email().required().label("Email"),
  password: string().required().label("Password"),
});

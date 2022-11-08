import { AuthErrors } from "../interfaces/authInterface";

export const signinValidate = (obj: AuthErrors) => {
  const errors: AuthErrors = {};
  if (obj.email === "") errors.email = "Enter email address";
  if (obj.password === "") errors.password = "Enter password";

  return Object.keys(errors).length === 0 ? null : errors;
};

export const signupValidate = (obj: AuthErrors) => {
  const errors: AuthErrors = {};
  if (obj.email === "") errors.email = "Enter email address";
  if (obj.password === "") errors.password = "Enter password";
  if (obj.name === "") errors.name = "Enter your name";
  if (obj.confirmPassword === "") errors.confirmPassword = "Confirm password";

  return Object.keys(errors).length === 0 ? null : errors;
};

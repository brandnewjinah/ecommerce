import { AuthIF } from "../interfaces/authInterface";

export const signinValidate = (obj: AuthIF) => {
  const errors: AuthIF = {};
  if (obj.email === "") errors.email = "Please enter correct admin email";
  if (obj.password === "") errors.password = "Please enter correct password";

  return Object.keys(errors).length === 0 ? null : errors;
};

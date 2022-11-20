import { AuthErrors } from "../interfaces/authInterface";
import { ShippingIF } from "../interfaces/checkoutInterface";

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

export const shippingValidate = (obj: ShippingIF) => {
  const errors: ShippingIF = {};
  if (obj.fullName === "") errors.fullName = "Name is required";
  if (obj.streetAddress === "")
    errors.streetAddress = "Street Address is required";
  if (obj.city === "") errors.city = "City is required";
  if (obj.state === "") errors.state = "State is required";
  if (obj.zip === "") errors.zip = "Zip Code is required";
  if (obj.phone === "") errors.phone = "Phone number is required";

  return Object.keys(errors).length === 0 ? null : errors;
};

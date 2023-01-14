import { AuthIF } from "../interfaces/authInterface";
import {
  ProductWithCategoryIF,
  ProductErrorIF,
} from "../interfaces/productInterface";
import { CategoryIF } from "../interfaces/settingsInterface";

export const signinValidate = (obj: AuthIF) => {
  const errors: AuthIF = {};
  if (obj.email === "") errors.email = "Please enter correct admin email";
  if (obj.password === "") errors.password = "Please enter correct password";

  return Object.keys(errors).length === 0 ? null : errors;
};

export const productValidate = (obj: ProductWithCategoryIF) => {
  const errors: ProductErrorIF = {};
  if (obj.name === "") errors.name = "Name is required";
  if (obj.brand === "") errors.brand = "Brand is required";
  if (obj.price === "") errors.price = "Price is required";
  if (obj.category1!.value === "") errors.category1 = "Category1 is required";

  return Object.keys(errors).length === 0 ? null : errors;
};

export const categoryValidate = (obj: CategoryIF) => {
  const errors: CategoryIF = {};
  if (obj.name === "") errors.name = "Name is required";
  if (obj.value === "") errors.value = "Value is required";

  return Object.keys(errors).length === 0 ? null : errors;
};

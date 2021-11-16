export const userValidation = (user) => {
  const errors = {};

  if (user.name === "") {
    errors.name = "Name is required";
  }

  if (user.email === "") {
    errors.email = "Email address is required";
  }

  if (user.password === "") {
    errors.password = "Password is required";
  }

  return Object.keys(errors).length === 0 ? null : errors;
};

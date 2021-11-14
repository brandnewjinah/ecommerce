import React from "react";

const MyInput = ({ name, label, placeholder, register }) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input name={name} placeholder={placeholder} {...register(name)} />
    </>
  );
};
export default MyInput;

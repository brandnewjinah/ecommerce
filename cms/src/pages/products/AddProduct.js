import React, { useState } from "react";
import axios from "axios";

//import components
import Input from "../../components/Input";
import Button from "../../components/Button";

//import styles and assets
import styled from "styled-components";
import { getPositionOfLineAndCharacter } from "typescript";

const AddProduct = () => {
  const [data, setData] = useState({
    name: "",
    price: "",
    category: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = ({ currentTarget: input }) => {
    const userInput = { ...data };
    userInput[input.name] = input.value;
    setData(userInput);
  };

  const validate = () => {
    const errors = {};
    if (data.name === "") {
      errors.name = "Name is required";
    }
    if (data.price === "") {
      errors.price = "Price is required";
    }
    if (data.category === "") {
      errors.category = "Category is required";
    }
    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    console.log(errors);
    setErrors(errors || {});
    if (errors) return;
    postData();
  };

  const postData = async () => {
    try {
      const product = {
        name: data.name,
        price: data.price,
        category: data.category,
      };
      console.log(product);
      const productProduct = await axios.post(
        "http://localhost:5000/product",
        product
      );
    } catch (ex) {
      if (ex.response && ex.presponse.status === 400) {
        alert("error");
      }
    }
  };

  return (
    <Wrapper>
      <h4>AddProduct</h4>
      <form onSubmit={handleSubmit}>
        <Input
          label="Product Name"
          name="name"
          error={errors.name}
          handleChange={handleChange}
        />
        <Input
          label="Price"
          name="price"
          error={errors.price}
          handleChange={handleChange}
        />
        <Input
          label="Category"
          name="category"
          error={errors.category}
          handleChange={handleChange}
        />
        <Button label="Post" />
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default AddProduct;

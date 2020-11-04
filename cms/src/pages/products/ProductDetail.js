import React, { useEffect, useState } from "react";
import axios from "axios";

//import components
import Input from "../../components/Input";
import Button from "../../components/Button";

//import styles and assets
import styled from "styled-components";

const ProductDetail = (props) => {
  const [data, setData] = useState({
    name: "",
    price: "",
    category: "",
    brand: "",
    code: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = ({ currentTarget: input }) => {
    const userInput = { ...data };
    userInput[input.name] = input.value;
    setData(userInput);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data } = await axios.get(
      `../data/product/${props.match.params.id}.json`
    );
    setData(data.productInfo);
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
    // if (data.brand === "") {
    //   errors.brand = "Brand is required";
    // }
    if (data.code === "") {
      errors.code = "Code is required";
    }
    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    console.log(errors);
    setErrors(errors || {});
    if (errors) return;
    updateData();
  };

  const updateData = async () => {
    try {
      const product = {
        name: data.name,
        price: data.price,
        category: data.category,
        brand: data.brand,
        code: data.code,
      };
      console.log(product);
      const productProduct = await axios.put(
        `http://localhost:5000/product/${props.match.params.id}`,
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
      <h4>Product Detail</h4>
      <form onSubmit={handleSubmit}>
        <Input
          label="Product Name"
          name="name"
          value={data.name}
          error={errors.name}
          handleChange={handleChange}
        />
        <Input
          label="Price"
          name="price"
          value={data.price}
          error={errors.price}
          handleChange={handleChange}
        />
        <Input
          label="Category"
          name="category"
          value={data.category}
          error={errors.category}
          handleChange={handleChange}
        />
        <Input
          label="Brand"
          name="brand"
          value={data.brand}
          error={errors.brand}
          handleChange={handleChange}
        />
        <Input
          label="Code"
          name="code"
          value={data.code}
          error={errors.code}
          handleChange={handleChange}
        />
        <Button label="Update" />
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default ProductDetail;

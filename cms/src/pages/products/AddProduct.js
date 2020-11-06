import React, { useState } from "react";
import axios from "axios";

//import components
import Input from "../../components/Input";
import { Button } from "../../components/Button";
import Dropdown from "../../components/Dropdown";

//import styles and assets
import styled from "styled-components";

const catData = [
  {
    name: "Beverages",
    subcategory: [{ name: "Coffee" }, { name: "Tea" }, { name: "Other" }],
  },
  {
    name: "Snacks",
    subcategory: [{ name: "Chips" }, { name: "Candy" }, { name: "Cookies" }],
  },
  {
    name: "Health",
    subcategory: [
      { name: "Vitamins" },
      { name: "Supplements" },
      { name: "Baby" },
    ],
  },
];

const AddProduct = () => {
  const [data, setData] = useState({
    name: "",
    price: "",
    category1: "",
    category2: "",
    brand: "",
    code: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = ({ currentTarget: input }) => {
    const userInput = { ...data };
    userInput[input.name] = input.value;
    setData(userInput);
  };

  const handleCategory = (item) => {
    let newData = { ...data, category1: item };
    setData(newData);
  };

  const handleOptions = (item) => {
    let newData = { ...data, category2: item };
    setData(newData);
  };

  const validate = () => {
    const errors = {};
    if (data.name === "") {
      errors.name = "Name is required";
    }
    if (data.price === "") {
      errors.price = "Price is required";
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
    postData();
  };

  const postData = async () => {
    const product = {
      name: data.name,
      price: data.price,
      category1: data.category1,
      category2: data.category2,
      brand: data.brand,
      code: data.code,
    };

    const token = localStorage.getItem("token");

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios
      .post("http://localhost:5000/product", product, options)
      .then((res) => {
        if (res.status === 200) {
          alert("Product saved");
        }
      })
      .catch((err) => {
        // if (
        //   err.response &&
        //   err.response.status >= 400 &&
        //   err.response.status < 500
        // )
        alert(err);
      });
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
          label="Brand"
          name="brand"
          error={errors.brand}
          handleChange={handleChange}
        />
        <Input
          label="Price"
          name="price"
          prefix="$"
          value={data.price}
          error={errors.price}
          handleChange={handleChange}
        />
        <div style={{ margin: `1em 0`, width: `40%` }}>
          <Dropdown
            data={catData}
            handleSelection={(item) => handleCategory(item)}
          />
        </div>
        <div style={{ margin: `1em 0`, width: `40%` }}>
          {data.category1 !== "" && (
            <Dropdown
              data={
                catData.filter((f) => f.name === data.category1)[0].subcategory
              }
              handleSelection={(item) => handleOptions(item)}
            />
          )}
        </div>
        <Input
          label="Code"
          name="code"
          error={errors.code}
          handleChange={handleChange}
        />
        <Button label="Post" />
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default AddProduct;

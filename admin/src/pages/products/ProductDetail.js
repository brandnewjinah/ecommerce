import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config.json";

//import components
import Input from "../../components/Input";
import { Button, TextButton } from "../../components/Button";
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
    subcategory: [
      { name: "Chips" },
      { name: "Candy" },
      { name: "Cookies" },
      { name: "Meal Kits" },
    ],
  },
  {
    name: "Bakery",
    subcategory: [{ name: "Cakes" }, { name: "Bread" }],
  },
];

const ProductDetail = (props) => {
  const [data, setData] = useState({
    name: "",
    price: "",
    category1: "",
    category2: "",
    brand: "",
    image: "",
    code: "",
  });

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`${config.API}/product/${props.match.params.id}`)
        .then((res) => {
          const { productInfo } = res.data;
          setData(productInfo);
        })
        .catch((err) => {
          alert(err);
        });
    };
    getData();
  }, [props.match.params.id]);

  const [errors, setErrors] = useState({});

  const handleChange = ({ currentTarget: input }) => {
    const userInput = { ...data };
    userInput[input.name] = input.value;
    setData(userInput);
  };

  const handleCategory = (item) => {
    let newData = { ...data, category1: item, category2: "" };
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
    updateData();
  };

  const updateData = async () => {
    const product = {
      name: data.name,
      price: data.price,
      category1: data.category1,
      category2: data.category2,
      brand: data.brand,
      image: data.image,
      code: data.code,
    };

    const token = localStorage.getItem("token");

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios
      .put(`${config.API}/product/${props.match.params.id}`, product, options)
      .then((res) => {
        if (res.status === 200) {
          alert("Product saved");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios
      .delete(`${config.API}/product/${props.match.params.id}`, options)
      .then((res) => {
        if (res.status === 200) {
          alert("Product deleted");
          props.history.push("/products");
        }
      })
      .catch((err) => {
        alert(err);
      });
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
        {/* <div style={{ margin: `1em 0`, width: `40%` }}>
          {data.category1 !== "" && (
            <Dropdown
              data={catData}
              select={data.category1}
              handleSelection={(item) => handleCategory(item)}
            />
          )}
        </div> */}
        <div style={{ margin: `1em 0`, width: `40%` }}>
          <Dropdown
            data={catData}
            select={data.category1}
            handleSelection={(item) => handleCategory(item)}
          />
        </div>
        <div style={{ margin: `1em 0`, width: `40%` }}>
          {data.category1 !== "" && (
            <Dropdown
              data={
                catData.filter((f) => f.name === data.category1)[0].subcategory
              }
              select={data.category2}
              handleSelection={(item) => handleOptions(item)}
            />
          )}
        </div>
        <Input
          label="Brand"
          name="brand"
          value={data.brand}
          error={errors.brand}
          handleChange={handleChange}
        />
        <Input
          label="Image"
          name="image"
          value={data.image}
          error={errors.image}
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
      <div style={{ margin: `1em 0` }}>
        <TextButton label="Delete Product" handleClick={handleDelete} />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default ProductDetail;

import React, { useState } from "react";
import styled from "styled-components";
import * as api from "../../api/index";
import axios from "axios";

//components
import Heading from "../../components/Heading";
import { Div } from "../../components/containers/Divs";
import { Card } from "../../components/Card";
import Input from "../../components/Input";
import { Button } from "../../components/Button";
import Select from "../../components/Select";
import Text from "../../components/Text";

//data
import { categoryList } from "../../data/category";

//redux
import { useSelector } from "react-redux";

const AddProduct = () => {
  const { currentUser } = useSelector((state) => state.auth);

  const [productInfo, setProductInfo] = useState({
    name: "",
    brand: "",
    sku: "",
    price: "",
    category1: {},
    category2: {},
    img: "",
    size: "",
  });

  const [previewSource, setPreviewSource] = useState("");

  const handleImageFile = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewSource(reader.result);
    };
  };

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (productInfo.name === "") errors.name = "Name is required";
    if (productInfo.brand === "") errors.brand = "Brand is required";
    if (productInfo.price === "") errors.price = "Price is required";
    if (productInfo.sku === "") errors.sku = "SKU is required";
    if (productInfo.price === "") errors.price = "Price is required";

    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleChange = (e) => {
    setProductInfo({ ...productInfo, [e.target.name]: e.target.value });
  };

  const handleCategory = (name) => (event) => {
    setProductInfo({
      ...productInfo,
      [name]:
        name === "category1"
          ? categoryList[event.target.value]
          : productInfo.category1.subcategory[event.target.value],
    });
  };

  const handleSubmit = async () => {
    const errors = validate();
    setErrors(errors || {});
    if (errors) return;

    if (!previewSource) return;
    const newProductInfo = { ...productInfo, img: previewSource };

    // dispatch(addProduct(newProductInfo));

    try {
      const result = await axios.post(`${api.URL}/products`, newProductInfo, {
        headers: {
          authorization: `Bearer ${currentUser.token}`,
        },
      });
      result.status === 201 && alert("success");
      clear();
    } catch (error) {
      return error;
    }
  };

  const clear = () => {
    setProductInfo({
      name: "",
      brand: "",
      sku: "",
      price: "",
      category1: {},
      category2: {},
      img: "",
      size: "",
    });
    setPreviewSource("");
  };

  return (
    <Div>
      <Heading title="Add Product" />
      <Card margin={`1rem 0`}>
        <Div padding="0.75rem 0">
          <Input
            label="Product Name"
            name="name"
            value={productInfo.name}
            error={errors.name}
            handleChange={handleChange}
          />
        </Div>
        <Div padding="0.75rem 0">
          <div className="four">
            <Input
              label="Brand"
              name="brand"
              value={productInfo.brand}
              error={errors.brand}
              handleChange={handleChange}
            />
          </div>
          <div className="one">
            <Input
              label="SKU"
              name="sku"
              value={productInfo.sku}
              error={errors.sku}
              handleChange={handleChange}
            />
          </div>
        </Div>
        <Div padding="0.75rem 0">
          <Input
            label="Price"
            name="price"
            value={productInfo.price}
            error={errors.price}
            handleChange={handleChange}
          />
        </Div>
      </Card>
      <Card margin={`1rem 0`}>
        <Div padding="0.75rem 0">
          <Text variant="caption" padding="0 0 .25rem 0">
            Category 1
          </Text>
          <Select
            options={categoryList}
            selected={productInfo.category1.value}
            onChange={handleCategory("category1")}
            fullWidth
          />
        </Div>

        <Div padding="0.75rem 0">
          <Text variant="caption" padding="0 0 .25rem 0">
            Category 2
          </Text>
          <Select
            options={productInfo.category1.subcategory}
            selected={productInfo.category2.value}
            onChange={handleCategory("category2")}
            fullWidth
          />
        </Div>
      </Card>
      <Card margin={`1rem 0`}>
        <input
          type="file"
          name="img"
          value={productInfo.img}
          onChange={handleImageFile}
        />
        {previewSource && (
          <img src={previewSource} alt="chosen" style={{ height: "300px" }} />
        )}
      </Card>
      <Card margin={`1rem 0`}>
        <Div padding="0.75rem 0">
          <Input
            label="Size"
            name="size"
            value={productInfo.size}
            handleChange={handleChange}
          />
        </Div>
      </Card>
      <Button
        label="Add"
        type="submit"
        color="#1C9CFD"
        handleClick={handleSubmit}
      />
    </Div>
  );
};

export default AddProduct;

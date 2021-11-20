import React, { useState, useEffect } from "react";
import Select from "react-select";
import styled from "styled-components";
import * as api from "../../api/index";

//components
import { Card } from "../../components/Card";
import Input from "../../components/Input";
import { Button, IconButton, TextButton } from "../../components/Button";

//data
import { categoryList } from "../../data/category";

//token and icons
import { typeScale } from "../../components/token";

//redux
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/productRedux";

const AddProduct = () => {
  const dispatch = useDispatch();

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

  const handleCategory = (name) => (value) => {
    setProductInfo({ ...productInfo, [name]: value });
  };

  const handleSubmit = async () => {
    const errors = validate();
    setErrors(errors || {});
    if (errors) return;
    // dispatch(addProduct(productInfo));
    if (!previewSource) return;
    const newProductInfo = { ...productInfo, img: previewSource };

    try {
      const result = await api.addProduct(newProductInfo);
      result.status === 201 && clear();
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
    <Container>
      <h3>Add Product</h3>
      <Card margin={`1rem 0`}>
        <Item>
          <div className="one">
            <Input
              label="Product Name"
              name="name"
              value={productInfo.name}
              error={errors.name}
              handleChange={handleChange}
            />
          </div>
        </Item>
        <Item>
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
        </Item>
        <Item>
          <div className="one">
            <Input
              label="Price"
              name="price"
              value={productInfo.price}
              error={errors.price}
              handleChange={handleChange}
            />
          </div>
        </Item>
      </Card>
      <Card margin={`1rem 0`}>
        <SelectWrapper>
          <p className="label">Select Main Category</p>
          <Select
            name="category1"
            value={productInfo.category1}
            options={categoryList}
            onChange={handleCategory("category1")}
          />
        </SelectWrapper>
        {Object.keys(productInfo.category1).length !== 0 &&
          productInfo.category1.subcategory && (
            <SelectWrapper>
              <p className="label">Select Subcategory</p>
              <Select
                name="category2"
                value={productInfo.category2}
                options={productInfo.category1.subcategory}
                onChange={handleCategory("category2")}
              />
            </SelectWrapper>
          )}
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
        <Item>
          <div className="one">
            <Input
              label="Size"
              name="size"
              value={productInfo.size}
              handleChange={handleChange}
            />
          </div>
        </Item>
      </Card>
      <Button
        label="Add"
        type="submit"
        color="#06193b"
        handleClick={handleSubmit}
      />
    </Container>
  );
};

const Container = styled.div`
  h3 {
    text-transform: uppercase;
  }
`;

const Item = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  .one {
    flex: 1;
  }

  .four {
    flex: 4;
  }

  .nine {
    flex: 9;
  }
`;

const SelectWrapper = styled.div`
  padding: 0.75rem 0;

  .label {
    font-size: ${typeScale.sbody};
    padding: 0 0 0.5rem;
  }
`;

export default AddProduct;

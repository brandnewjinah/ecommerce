import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import AsyncSelect from "react-select/async";

//import components
import Input from "../../../components/Input";
import { Button } from "../../../components/Button";
import Dropdown from "../../../components/Dropdown";

//import styles and assets
import styled from "styled-components";
import colors from "../../../components/Colors";

//import data
import { catData } from "../../../data/category";
import { sizeData, currencyData } from "../../../data/options";

const AddProduct = () => {
  const [data, setData] = useState({
    name: "",
    currency: {},
    price: "",
    category1: {},
    category2: {},
    category3: {},
    brand: "",
    image: "",
    code: "",
    color: [],
    size: [],
  });

  const [variant, setVariant] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = ({ currentTarget: input }) => {
    const userInput = { ...data };
    userInput[input.name] = input.value;
    setData(userInput);
  };

  const handleCategory = (name) => (value) => {
    let newData = { ...data, [name]: value };
    setData(newData);
  };

  const handleVariant = ({ currentTarget: input }) => {
    let newData = { ...data };
    let newColor = [...newData.color];
    console.log(input);
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
      .post("http://localhost:5000/product", product, options)
      .then((res) => {
        if (res.status === 200) {
          console.log(product);
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
      <h6>Add Product</h6>

      <form onSubmit={handleSubmit}>
        <Container>
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
          <Currency>
            <p>Price</p>
            <Flex>
              <div className="symbol">
                <Select
                  name="currency"
                  defaultValue={currencyData[0]}
                  options={currencyData}
                  onChange={handleCategory("currency")}
                  components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                  }}
                />
              </div>
              <div className="value">
                <Input
                  name="price"
                  value={data.price}
                  error={errors.price}
                  handleChange={handleChange}
                />
              </div>
            </Flex>
          </Currency>
        </Container>
        <Container>
          <Category>
            <p>Select Main Category</p>
            <Select
              name="category1"
              options={catData}
              onChange={handleCategory("category1")}
            />
          </Category>

          {Object.keys(data.category1).length !== 0 &&
            data.category1.subcategory && (
              <Category>
                <p>Select Subcategory</p>
                <Select
                  name="category2"
                  options={data.category1.subcategory}
                  onChange={handleCategory("category2")}
                />
              </Category>
            )}

          {Object.keys(data.category2).length !== 0 &&
            data.category2.subcategory && (
              <Category>
                <p>A litte more detail</p>
                <Select
                  name="category3"
                  options={data.category2.subcategory}
                  onChange={handleCategory("category3")}
                />
              </Category>
            )}
        </Container>
        <Container>
          <Input
            label="Image URL"
            name="image"
            value={data.image}
            error={errors.image}
            handleChange={handleChange}
          />
          <Input
            label="Store Name"
            name="store"
            value={data.store}
            error={errors.store}
            handleChange={handleChange}
          />
          <Input
            label="Store Link"
            name="storeLink"
            value={data.storeLink}
            error={errors.store}
            handleChange={handleChange}
          />
        </Container>
        <Container>
          <Currency>
            <p>Size</p>
            <Select
              isMulti
              name="size"
              placeholder="Select size"
              options={sizeData}
              onChange={handleCategory("size")}
            />
            {data.size &&
              data.size.length > 0 &&
              data.size.map((s, idx) => (
                <Flex>
                  <div className="left">{s.label}</div>
                  <div className="right">
                    <Input
                      name={s.label}
                      placeholder="SKU"
                      handleChange={handleVariant}
                    />
                  </div>
                </Flex>
              ))}
          </Currency>
        </Container>
        <Container>
          <Currency>
            <div>
              <span>Has variants?</span>
              <span style={{ display: `inline-block`, marginLeft: `.5em` }}>
                <input
                  type="checkbox"
                  name="essential"
                  style={{ verticalAlign: `middle` }}
                  checked={variant}
                  onChange={() => setVariant(!variant)}
                />
              </span>
            </div>
            {variant && (
              <>
                <p>Price</p>
                <div className="flex">
                  <div className="symbol">
                    <Select
                      name="currency"
                      defaultValue={currencyData[0]}
                      options={currencyData}
                      onChange={handleCategory("currency")}
                      components={{
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null,
                      }}
                    />
                  </div>
                  <div className="value">
                    <Input
                      name="price"
                      value={data.price}
                      error={errors.price}
                      handleChange={handleChange}
                    />
                  </div>
                </div>
              </>
            )}
          </Currency>
        </Container>
        <Button label="Post" />
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  h6 {
    text-transform: uppercase;
  }
`;

const Container = styled.div`
  background-color: #fff;
  border-radius: 0.25em;
  padding: 2em;
  margin: 1em 0;
`;

const Currency = styled.div`
  width: 100%;

  .symbol {
    flex: 1 1 8%;
    margin-right: 1%;
  }

  .value {
    flex: 1 1 91%;
  }
`;

const Flex = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1em 0;

  .left {
    flex: 1 1 10%;
  }

  .right {
    flex: 1 1 90%;
  }
`;

const Category = styled.div`
  margin: 1em 0;
`;
export default AddProduct;

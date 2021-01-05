import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { useHistory, useLocation, useParams } from "react-router-dom";

//import components
import Input from "../../../components/Input";
import { Button, BtnClose, BtnText } from "../../../components/Button";

//import styles and assets
import styled from "styled-components";
import colors from "../../../components/Colors";

//import data
import { catData } from "../../../data/category";
import { colorData, sizeData, currencyData } from "../../../data/options";

//redux
import { connect } from "react-redux";
import { addItem } from "../../../reducers/productReducer";

const AddProduct = (props) => {
  const history = useHistory();
  let location = useLocation();
  let { sku } = useParams();

  const [data, setData] = useState({
    name: "",
    brand: "",
    sku: "",
    currency: {},
    price: "",
    category1: {},
    category2: {},
    category3: {},
    imgs: [
      {
        id: 1,
        src: "",
      },
    ],
    store: "",
    link: "",
    color: [],
    size: "",
  });

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

  const handleColor = ({ currentTarget: input }) => {
    let newData = { ...data };
    let newColor = [...newData.color];
    let thisColor = newColor.find((c) => c.label === input.name);
    thisColor = { ...thisColor, sku: input.value };

    let index = newColor.findIndex((item) => item.id === thisColor.id);
    newColor[index] = thisColor;
    newData = { ...newData, color: newColor };
    setData(newData);
  };

  const handleSize = ({ currentTarget: input }) => {
    let newData = { ...data };
    let newSize = [...newData.size];
    let thisSize = newSize.find((c) => c.label === input.name);
    thisSize = { ...thisSize, sku: input.value };

    let index = newSize.findIndex((item) => item.id === thisSize.id);
    newSize[index] = thisSize;
    newData = { ...newData, size: newSize };
    setData(newData);
  };

  let newImgs = [...data.imgs];
  const handleImgAdd = () => {
    let id = newImgs[newImgs.length - 1].id + 1;
    newImgs = [...newImgs, { id: id, src: "" }];
    setData({ ...data, imgs: newImgs });
  };

  const handleImgChange = (e, idx) => {
    const userInput = { ...data };
    userInput[e.target.name][idx].src = e.target.value;
    setData(userInput);
  };

  const handleImgDelete = (id) => {
    newImgs = newImgs.filter((i) => i.id !== id);
    setData({ ...data, imgs: newImgs });
  };

  const validate = () => {
    const errors = {};
    if (data.name === "") {
      errors.name = "Name is required";
    }
    if (data.price === "") {
      errors.price = "Price is required";
    }
    // if (data.SKU === "") {
    //   errors.SKU = "SKU is required";
    // }
    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleSubmit = () => {
    // e.preventDefault();
    const errors = validate();
    setErrors(errors || {});
    if (errors) return;

    props.addItem(data);
    history.push("/cms/products");
    // postData();
  };

  // const postData = async () => {
  //   const product = {
  //     name: data.name,
  //     price: data.price,
  //     category1: data.category1,
  //     category2: data.category2,
  //     brand: data.brand,
  //     image: data.image,
  //     code: data.code,
  //   };

  //   const token = localStorage.getItem("token");

  //   const options = {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };

  //   await axios
  //     .post("http://localhost:5000/product", product, options)
  //     .then((res) => {
  //       if (res.status === 200) {
  //         console.log(product);
  //         alert("Product saved");
  //       }
  //     })
  //     .catch((err) => {
  //       // if (
  //       //   err.response &&
  //       //   err.response.status >= 400 &&
  //       //   err.response.status < 500
  //       // )
  //       alert(err);
  //     });
  // };

  const getData = async () => {
    if (location.pathname.includes("/edit")) {
      //from redux store
      const currentItem = await props.product.find((c) => c.sku === sku);
      setData(currentItem);
    }
  };

  useEffect(() => {
    getData();
  }, [sku]);

  return (
    <Wrapper>
      <Flex>
        <div>
          {location.pathname.includes("/edit/") ? (
            <h6>Edit Product</h6>
          ) : (
            <h6>Add Product</h6>
          )}
        </div>
        <div>
          {location.pathname.includes("/edit/") ? (
            <Button label="Save Changes" handleClick={handleSubmit} />
          ) : (
            <Button label="Add" handleClick={handleSubmit} />
          )}
        </div>
      </Flex>
      <Container>
        <div className="item">
          <Input
            label="Product Name"
            name="name"
            value={data.name}
            error={errors.name}
            handleChange={handleChange}
          />
        </div>
        <Flex>
          <div className="eight">
            <Input
              label="Brand"
              name="brand"
              value={data.brand}
              error={errors.brand}
              handleChange={handleChange}
            />
          </div>
          <div className="two">
            <Input
              label="SKU"
              name="sku"
              value={data.sku}
              error={errors.sku}
              handleChange={handleChange}
            />
          </div>
        </Flex>
        <div className="item">
          <p className="label">Price</p>
          <Flex>
            <div className="one">
              <Select
                name="currency"
                styles={customStyles}
                value={data.currency}
                defaultValue={currencyData[0]}
                options={currencyData}
                onChange={handleCategory("currency")}
                components={{
                  DropdownIndicator: () => null,
                  IndicatorSeparator: () => null,
                }}
              />
            </div>
            <div className="nine">
              <Input
                name="price"
                value={data.price}
                error={errors.price}
                handleChange={handleChange}
              />
            </div>
          </Flex>
        </div>
      </Container>
      <Container>
        <div className="item">
          <p className="label">Select Main Category</p>
          <Select
            name="category1"
            styles={customStyles}
            value={data.category1}
            options={catData}
            onChange={handleCategory("category1")}
          />
        </div>

        {Object.keys(data.category1).length !== 0 &&
          data.category1.subcategory && (
            <div className="item">
              <p className="label">Select Subcategory</p>
              <Select
                name="category2"
                styles={customStyles}
                value={data.category2}
                options={data.category1.subcategory}
                onChange={handleCategory("category2")}
              />
            </div>
          )}

        {Object.keys(data.category2).length !== 0 &&
          data.category2.subcategory && (
            <div className="item">
              <p className="label">A litte more detail</p>
              <Select
                name="category3"
                styles={customStyles}
                value={data.category3}
                options={data.category2.subcategory}
                onChange={handleCategory("category3")}
              />
            </div>
          )}
      </Container>
      <Container>
        {data.imgs.map((img, idx) => (
          <InputWrapper>
            <div className="left">
              <Input
                label="Image URL"
                name="imgs"
                value={img.src}
                error={errors.image}
                handleChange={(e) => handleImgChange(e, idx)}
              />
            </div>
            {idx === 0 ? (
              <div className="right"></div>
            ) : (
              <div className="right">
                <BtnClose handleClick={() => handleImgDelete(img.id)} />
              </div>
            )}
          </InputWrapper>
        ))}
        <div className="center">
          <BtnText
            label="More"
            color={colors.gray}
            handleClick={handleImgAdd}
          />
        </div>
      </Container>
      <Container>
        <div className="item">
          <Input
            label="Store Name"
            name="store"
            value={data.store}
            error={errors.store}
            handleChange={handleChange}
          />
        </div>
        <div className="item">
          <Input
            label="Store Link"
            name="link"
            value={data.link}
            error={errors.link}
            handleChange={handleChange}
          />
        </div>
      </Container>
      <Container>
        <div className="item">
          <Input
            label="Size"
            name="size"
            value={data.size}
            error={errors.size}
            handleChange={handleChange}
          />
        </div>
      </Container>
      {/* <Container>
        <div className="item">
          <p className="label">Size</p>
          <Select
            isMulti
            name="size"
            styles={customStyles}
            placeholder="Select size"
            value={data.size}
            options={sizeData}
            onChange={handleCategory("size")}
          />
        </div>
        {data.size &&
          data.size.length > 0 &&
          data.size.map((s, idx) => (
            <Flex key={idx}>
              <div className="one">{s.label}</div>
              <div className="nine">
                <Input
                  name={s.label}
                  value={s.sku}
                  placeholder="SKU"
                  handleChange={handleSize}
                />
              </div>
            </Flex>
          ))}
      </Container> */}
      <Container>
        <div className="item">
          <p className="label">Color</p>
          <Select
            isMulti
            name="color"
            styles={customStyles}
            placeholder="Select color"
            value={data.color}
            options={colorData}
            onChange={handleCategory("color")}
          />
        </div>
        {data.color &&
          data.color.length > 0 &&
          data.color.map((c, idx) => (
            <Flex key={idx}>
              <div className="one">{c.label}</div>
              <div className="nine">
                <Input
                  name={c.label}
                  value={c.sku}
                  placeholder="SKU"
                  handleChange={handleColor}
                />
              </div>
            </Flex>
          ))}
      </Container>
      <div className="right">
        {location.pathname.includes("/edit/") ? (
          <Button label="Save Changes" handleClick={handleSubmit} />
        ) : (
          <Button label="Add" handleClick={handleSubmit} />
        )}
      </div>
    </Wrapper>
  );
};

const customStyles = {
  control: (styles) => ({
    ...styles,
    borderRadius: `0.25em`,
    border: `1px solid #e4e4e4`,
  }),
  multiValue: (styles) => ({
    ...styles,
    backgroundColor: colors.lightergray,
    padding: `0 0.5em`,
  }),
};

const Wrapper = styled.div`
  h6 {
    text-transform: uppercase;
  }

  .right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`;

const Container = styled.div`
  background-color: #fff;
  box-shadow: 0 0 30px 0 rgba(63, 76, 105, 0.05);
  border-radius: 0.25em;
  padding: 2em;
  margin-bottom: 1em;

  .item {
    margin-bottom: 1em;
  }

  .label {
    font-weight: 400;
    color: ${colors.darkergray};
  }

  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Flex = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;

  .one {
    flex: 0 1 9%;
  }

  .two {
    flex: 0 1 20%;
  }

  .eight {
    flex: 0 1 79%;
  }

  .nine {
    flex: 0 1 90%;
  }

  @media (max-width: 780px) {
    .eight {
      flex: 0 1 49.5%;
    }

    .two {
      flex: 0 1 49.5%;
    }

    .one {
      flex: 0 1 49.5%;
    }

    .nine {
      flex: 0 1 49.5%;
    }
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1em;

  .left {
    width: 96%;
  }

  .right {
    width: 2%;
    padding-top: 2.25em;
  }
`;

const mapStateToProps = (state) => {
  return {
    product: state.products.products,
  };
};

export default connect(mapStateToProps, { addItem })(AddProduct);

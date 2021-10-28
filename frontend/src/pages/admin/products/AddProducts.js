import React, { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";

//import libraries
import Select from "react-select";
import moment from "moment";

//import components
import Input from "../../../components/Input";
import { Button, BtnClose, BtnText } from "../../../components/Button";

//import data
import { categoryList } from "../../../data/category";
import { currencyData } from "../../../data/options";
import { demoProducts } from "../../../data/demo/demoProducts";

//redux
import { connect } from "react-redux";
import { addItem, editItem } from "../../../reducers/productReducer";

//import styles and assets
import styled from "styled-components";
import colors from "../../../components/Colors";

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
    imgs: [
      {
        id: 1,
        src: "",
      },
    ],
    store: "",
    link: "",
    size: "",
    uploaded: moment().format(),
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
    if (data.SKU === "") {
      errors.SKU = "SKU is required";
    }
    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleSubmit = () => {
    const errors = validate();
    setErrors(errors || {});
    if (errors) return;

    props.addItem(data);
    history.push("/cms/products");
    // postData();
  };

  const handleEdit = () => {
    const errors = validate();
    setErrors(errors || {});
    if (errors) return;

    props.editItem({ ...data, uploaded: moment().toISOString() });
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

  useEffect(() => {
    const getData = () => {
      let allData = [...demoProducts, ...props.product];
      if (location.pathname.includes("/edit")) {
        //from redux store
        const currentItem = allData.find((c) => c.sku === sku);
        setData(currentItem);
      }
    };
    getData();
  }, [location.pathname, props.product, sku]);

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
          {/* {location.pathname.includes("/edit/") ? (
            <Button
              label="Save Changes"
              handleClick={handleEdit}
              type="fill"
              color="#06193b"
            />
          ) : (
            <Button
              label="Add"
              handleClick={handleSubmit}
              type="fill"
              color="#06193b"
            />
          )} */}
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
                options={currencyData}
                defaultValue={currencyData[0]}
                value={data.currency}
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
            options={categoryList}
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
          <InputWrapper key={idx}>
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
                {/* <BtnClose handleClick={() => handleImgDelete(img.id)} /> */}
              </div>
            )}
          </InputWrapper>
        ))}
        <div className="center">
          {/* <BtnText
            label="More"
            color={colors.gray}
            handleClick={handleImgAdd}
          /> */}
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

      <div className="right">
        {/* {location.pathname.includes("/edit/") ? (
          <Button
            label="Save Changes"
            handleClick={handleEdit}
            type="fill"
            color="#06193b"
          />
        ) : (
          <Button
            label="Add"
            handleClick={handleSubmit}
            type="fill"
            color="#06193b"
          />
        )} */}
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

export default connect(mapStateToProps, { addItem, editItem })(AddProduct);

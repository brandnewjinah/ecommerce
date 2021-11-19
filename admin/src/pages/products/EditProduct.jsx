import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Select from "react-select";
import styled from "styled-components";

//components
import { Card } from "../../components/Card";
import Input from "../../components/Input";
import { Button, IconButton, TextButton } from "../../components/Button";

//data
import { categoryList } from "../../data/category";

//token and icons
import { neutral } from "../../components/token";
import { Close } from "../../assets/Icons";

//redux
import { useDispatch, useSelector } from "react-redux";
import { addProduct, updateProduct } from "../../redux/productReducer";
import { getProductDetail } from "../../redux/productDetailRedux";

const AddProduct = () => {
  let { id } = useParams();
  const location = useLocation();
  console.log(location);
  const dispatch = useDispatch();
  // const existingProduct = useSelector((state) =>
  //   state.productList.products.find((product) => product.sku === id)
  // );

  const [productInfo, setProductInfo] = useState({
    name: "",
    brand: "",
    sku: "",
    price: "",
    category1: {},
    category2: {},
    imgs: [
      {
        id: 1,
        src: "",
      },
    ],
    size: "",
  });

  useEffect(() => {
    if (location.pathname.includes("/edit")) dispatch(getProductDetail(id));
  }, [dispatch, id]);

  const productDetail = useSelector((state) => state.productDetail);
  const { product, loading } = productDetail;

  useEffect(() => {
    if (product) setProductInfo(product);
  }, [product]);

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

  let newImgs = [...productInfo.imgs];

  const handleImgAdd = () => {
    let id = newImgs[newImgs.length - 1].id + 1;
    newImgs = [...newImgs, { id: id, src: "" }];
    setProductInfo({ ...productInfo, imgs: newImgs });
  };

  const handleImgChange = (e, idx) => {
    const userInput = { ...productInfo };
    userInput[e.target.name][idx].src = e.target.value;
    setProductInfo(userInput);
  };

  const handleImgDelete = (id) => {
    newImgs = newImgs.filter((i) => i.id !== id);
    setProductInfo({ ...productInfo, imgs: newImgs });
  };

  const handleSubmit = () => {
    const errors = validate();
    setErrors(errors || {});
    if (errors) return;

    const { currency, ...others } = productInfo;

    if (id) {
      dispatch(updateProduct(productInfo._id, others));
    } else {
      dispatch(addProduct(productInfo));
      clear();
    }
  };

  const clear = () => {
    setProductInfo({
      name: "",
      brand: "",
      sku: "",
      currency: { id: 501, label: "$", value: "USD" },
      price: "",
      category1: {},
      category2: {},
      imgs: [
        {
          id: 1,
          src: "",
        },
      ],
      size: "",
    });
  };

  return (
    <Container>
      <h3>{id ? "Edit Product" : "Add Product"}</h3>
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
      <Card>
        <p className="label">Select Main Category</p>
        <Select
          name="category1"
          value={productInfo.category1}
          options={categoryList}
          onChange={handleCategory("category1")}
        />
        {Object.keys(productInfo.category1).length !== 0 &&
          productInfo.category1.subcategory && (
            <div className="item">
              <p className="label">Select Subcategory</p>
              <Select
                name="category2"
                value={productInfo.category2}
                options={productInfo.category1.subcategory}
                onChange={handleCategory("category2")}
              />
            </div>
          )}
      </Card>
      <Card>
        {productInfo.imgs.map((img, idx) => (
          <Item key={idx}>
            <div className="nine">
              <Input
                label="Image URL"
                name="imgs"
                value={img.src}
                handleChange={(e) => handleImgChange(e, idx)}
              />
            </div>
            {idx === 0 ? (
              <></>
            ) : (
              <div className="one">
                <IconButton
                  icon={
                    <Close
                      width={16}
                      height={16}
                      stroke={2}
                      color={neutral[10]}
                    />
                  }
                  handleClick={() => handleImgDelete(img.id)}
                />
              </div>
            )}
          </Item>
        ))}
        <TextButton
          label="More"
          color={neutral[400]}
          handleClick={handleImgAdd}
        />
      </Card>
      <Card>
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
        label={id ? "Save Changes" : "Add"}
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

export default AddProduct;

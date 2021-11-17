import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Select from "react-select";
import styled from "styled-components";

//redux
import { useDispatch, useSelector } from "react-redux";
import { addProduct, updateProduct } from "../../redux/productReducer";

//components
import Input from "../../components/Input";
import { Button, IconButton, TextButton } from "../../components/Button";

//data
import { categoryList } from "../../data/category";
import { currencyData } from "../../data/options";

//token and icons
import { neutral } from "../../components/token";
import { Close } from "../../assets/Icons";

const AddProduct = () => {
  const location = useLocation();
  let { id } = useParams();
  const dispatch = useDispatch();
  const thisProduct = useSelector((state) =>
    id ? state.products.find((product) => product.sku === id) : null
  );

  const [product, setProduct] = useState({
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

  useEffect(() => {
    if (thisProduct) setProduct(thisProduct);
  }, [thisProduct]);

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (product.name === "") errors.name = "Name is required";
    if (product.brand === "") errors.brand = "Brand is required";
    if (product.price === "") errors.price = "Price is required";
    if (product.sku === "") errors.sku = "SKU is required";
    if (product.price === "") errors.price = "Price is required";

    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleCategory = (name) => (value) => {
    setProduct({ ...product, [name]: value });
  };

  let newImgs = [...product.imgs];
  const handleImgAdd = () => {
    let id = newImgs[newImgs.length - 1].id + 1;
    newImgs = [...newImgs, { id: id, src: "" }];
    setProduct({ ...product, imgs: newImgs });
  };

  const handleImgChange = (e, idx) => {
    const userInput = { ...product };
    userInput[e.target.name][idx].src = e.target.value;
    setProduct(userInput);
  };

  const handleImgDelete = (id) => {
    newImgs = newImgs.filter((i) => i.id !== id);
    setProduct({ ...product, imgs: newImgs });
  };

  const handleSubmit = () => {
    const errors = validate();
    setErrors(errors || {});
    if (errors) return;

    location.pathname.includes("/edit/")
      ? dispatch(updateProduct(product._id, product))
      : dispatch(addProduct(product));
  };

  return (
    <Container>
      {location.pathname.includes("/edit/") ? (
        <h6>Edit Product</h6>
      ) : (
        <h6>Add Product</h6>
      )}

      <Section>
        <Item>
          <div className="one">
            <Input
              label="Product Name"
              name="name"
              value={product.name}
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
              value={product.brand}
              error={errors.brand}
              handleChange={handleChange}
            />
          </div>
          <div className="one">
            <Input
              label="SKU"
              name="sku"
              value={product.sku}
              error={errors.sku}
              handleChange={handleChange}
            />
          </div>
        </Item>
        <Item>
          <div className="one">
            <p className="label">Currency</p>
            <Select
              value={product.currency}
              options={currencyData}
              onChange={handleCategory("currency")}
            />
          </div>
          <div className="four">
            <Input
              label="Price"
              name="price"
              value={product.price}
              error={errors.price}
              handleChange={handleChange}
            />
          </div>
        </Item>
      </Section>
      <Section>
        <p className="label">Select Main Category</p>
        <Select
          name="category1"
          styles={customStyles}
          value={product.category1}
          options={categoryList}
          onChange={handleCategory("category1")}
        />
        {Object.keys(product.category1).length !== 0 &&
          product.category1.subcategory && (
            <div className="item">
              <p className="label">Select Subcategory</p>
              <Select
                name="category2"
                styles={customStyles}
                value={product.category2}
                options={product.category1.subcategory}
                onChange={handleCategory("category2")}
              />
            </div>
          )}
      </Section>
      <Section>
        {product.imgs.map((img, idx) => (
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
      </Section>
      <Section>
        <Item>
          <div className="one">
            <Input
              label="Size"
              name="size"
              value={product.size}
              handleChange={handleChange}
            />
          </div>
        </Item>
      </Section>
      <Button
        label={location.pathname.includes("/edit/") ? "Save Changes" : "Add"}
        type="submit"
        color="#06193b"
        handleClick={handleSubmit}
      />
    </Container>
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
    backgroundColor: neutral[300],
    padding: `0 0.5em`,
  }),
};

const Container = styled.div`
  h6 {
    text-transform: uppercase;
  }

  .right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`;

const Section = styled.div`
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
    color: ${neutral[500]};
  }

  .center {
    display: flex;
    justify-content: center;
    align-items: center;
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

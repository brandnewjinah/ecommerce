import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

//components
import Heading from "../../components/Heading";
import { Card } from "../../components/Card";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Text from "../../components/Text";
import { Div, FlexDiv } from "../../components/containers/Divs";
import { Button } from "../../components/Button";

//data
import { categoryList } from "../../data/category";

//redux
import { useDispatch, useSelector } from "react-redux";
import { addProduct, updateProduct } from "../../redux/productReducer";
import { getProductDetail } from "../../redux/productDetailRedux";

const AddProduct = () => {
  let { id } = useParams();
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

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [dispatch, id]);

  const productDetail = useSelector((state) => state.productDetail);
  const { product, loading } = productDetail;

  useEffect(() => {
    if (product) setProductInfo(product);
    setPreviewSource(product.img);
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

  const handleCategory = (name) => (event) => {
    setProductInfo({
      ...productInfo,
      [name]:
        name === "category1"
          ? categoryList[event.target.value]
          : productInfo.category1.subcategory[event.target.value],
    });
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
      img: "",
      size: "",
    });
  };

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

  return loading ? (
    <Div>loading</Div>
  ) : (
    <Div>
      <Heading title="Edit Product" />
      <Card margin="1rem 0">
        <Div padding="0.75rem 0">
          <Input
            label="Product Name"
            name="name"
            value={productInfo.name}
            error={errors.name}
            handleChange={handleChange}
          />
        </Div>
        <FlexDiv padding="0.75rem 0">
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
        </FlexDiv>
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
      <Card margin="1rem 0">
        <Div padding="0.75rem 0">
          <Text variant="caption" padding="0 0 .25rem 0">
            Category 1
          </Text>
          <Select
            options={categoryList}
            selected={
              productInfo.category1 &&
              Object.keys(productInfo.category1).length !== 0 &&
              productInfo.category1.value
            }
            onChange={handleCategory("category1")}
            fullWidth
          />
        </Div>
        {productInfo.category1 &&
          Object.keys(productInfo.category1).length !== 0 &&
          productInfo.category1.subcategory &&
          Object.keys(productInfo.category1.subcategory).length !== 0 && (
            <Div padding="0.75rem 0">
              <Text variant="caption" padding="0 0 .25rem 0">
                Subcategory
              </Text>
              <Select
                options={productInfo.category1.subcategory}
                selected={productInfo.category2.value}
                onChange={handleCategory("category2")}
                fullWidth
              />
            </Div>
          )}
      </Card>
      <Card>
        <input type="file" name="img" onChange={handleImageFile} />
        {previewSource && (
          <img src={previewSource} alt="chosen" style={{ height: "300px" }} />
        )}
      </Card>
      <Card margin="1rem 0">
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
        label="Save Changes"
        type="submit"
        color="#1C9CFD"
        handleClick={handleSubmit}
      />
    </Div>
  );
};

export default AddProduct;

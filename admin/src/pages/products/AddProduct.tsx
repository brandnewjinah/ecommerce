import React, { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import styled from "styled-components";
import * as api from "../../api";

//comp
import Breadcrumbs from "../../components/Breadcrumbs";
import { Button } from "../../components/Button";
import { Div, Flex } from "../../components/containers/Div";
import { Section } from "../../components/containers/Section";
import { Header } from "../../components/Header";
import Select from "../../components/Select";
import { Body } from "../../components/Text";
import { TextArea } from "../../components/TextArea";
import { TextInput } from "../../components/TextInput";
import { neutral, primaryColor } from "../../components/token";
import { Image } from "../../assets/Icon";

//other
import {
  ProductErrorIF,
  ProductBasicIF,
  ProductFullIF,
  PriceIF,
} from "../../interfaces/productInterface";
import { productValidate } from "../../utils/validate";

//redux
import { useDispatch, useSelector } from "react-redux";
import { addProduct, reset } from "../../redux/productActionsReducer";
import { getCategories } from "../../redux/settingsReducer";
import { RootState } from "../../redux/store";
import { BrandsIF, BrandIF } from "../../interfaces/settingsInterface";
import { getProductDetails } from "../../redux/productDetailsReducer";

const AddProduct = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const pathAddProduct = location.pathname === "/products/add";
  const { id } = useParams<{ id: string }>();

  const [productInfo, setProductInfo] = useState<ProductFullIF>({
    name: "",
    brand: {
      name: "",
      value: "",
    },
    price: {
      current: "",
      previous: "",
    },
    size: "",
    category1: {
      _id: "",
      value: "",
      name: "",
      subCategory: [],
    },
    category2: {
      _id: "",
      value: "",
      name: "",
    },
    image: "",
    description: "",
  });
  const [suggestions, setSuggestions] = useState<BrandsIF>([]);
  const [errors, setErrors] = useState<ProductErrorIF>({});

  useEffect(() => {
    !pathAddProduct && id !== undefined && dispatch(getProductDetails(id));
  }, [pathAddProduct, id, dispatch]);

  const { product } = useSelector((state: RootState) => state.productDetails);

  useEffect(() => {
    if (product) setProductInfo(product);
  }, [product]);

  console.log(productInfo);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const userInput = { ...productInfo };
    userInput[name as keyof ProductBasicIF] = value;
    setProductInfo(userInput);
  };

  const handleBrandChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const handleCamel = (str: string) => {
      return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
        if (+match === 0) return "";
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
      });
    };
    const camel = handleCamel(value);
    const userInput = {
      ...productInfo,
      brand: {
        _id: "",
        name: value,
        value: camel,
      },
    };

    setProductInfo(userInput);
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newPrice = { ...productInfo.price };
    newPrice[name as keyof PriceIF] = value;
    setProductInfo({ ...productInfo, price: newPrice });
  };

  //user clicks on a suggestion
  const handleSuggestClick = (value: BrandIF) => {
    setProductInfo({ ...productInfo, brand: value });
    setSuggestions([]);
  };

  //categories
  useEffect(() => {
    dispatch(getCategories(""));
  }, [dispatch, productInfo.brand]);

  const { categories } = useSelector((state: RootState) => state.settings);

  useEffect(() => {
    const fetchBrand = async () => {
      const res = await api.privateRequest.get(
        `/search/brand?query=${productInfo.brand.name}`
      );
      setSuggestions(res.data);
    };

    if (
      productInfo.brand.name &&
      productInfo.brand.name !== "" &&
      productInfo.brand.name.length > 0
    ) {
      fetchBrand();
    } else {
      setSuggestions([]);
    }
  }, [productInfo.brand.name]);

  const handleCategorySelect =
    (name: string) => (e: ChangeEvent<HTMLSelectElement>) => {
      const { value } = e.target;

      setProductInfo({
        ...productInfo,
        [name]:
          name === "category1"
            ? categories.data[parseInt(value)]
            : productInfo.category1!.subCategory![parseInt(value)],
      });
    };

  //upload image from file
  const [previewSource, setPreviewSource] = useState("");

  const handleImageFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file: File | null) => {
    const reader = new FileReader();
    reader.readAsDataURL(file as Blob);

    reader.onload = () => {
      setPreviewSource(reader.result!.toString());
    };
  };

  const handleSubmit = () => {
    const product = { ...productInfo, image: previewSource };
    const errors = productValidate(product);

    setErrors(errors || {});

    if (errors) return;

    dispatch(addProduct(product));
  };

  //actions after submitting data
  const { productAdded } = useSelector(
    (state: RootState) => state.productActions
  );

  const clear = () => {
    setProductInfo({
      name: "",
      brand: {
        name: "",
        value: "",
      },
      price: {
        current: "",
        previous: "",
      },
      size: "",
      category1: {
        _id: "",
        value: "",
        name: "",
        subCategory: [],
      },
      category2: {
        _id: "",
        value: "",
        name: "",
      },
      image: "",
      description: "",
    });
    setPreviewSource("");
  };

  useEffect(() => {
    if (productAdded.status === 201) {
      alert("Product successfully created!");
      dispatch(reset());
      clear();
    } else if (productAdded.status !== 201 && productAdded.status !== 0) {
      alert("error");
    }
  }, [dispatch, productAdded.status, productAdded.productDetails._id]);

  return (
    <Div>
      <Header title={pathAddProduct ? "Add Product" : "Edit Product"} />
      <Breadcrumbs
        category1={{ title: "Home", link: "/home" }}
        category2={{
          title: pathAddProduct ? "Add Product" : "Product List",
          link: pathAddProduct ? null : "/products/list/all",
        }}
        category3={{ title: pathAddProduct ? null : "Edit Product" }}
      />

      <Section bgColor="#fff" gap="1rem" padding="1.25rem" margin="1rem 0">
        <TextInput
          label="Product Name"
          name="name"
          error={errors.name}
          value={productInfo.name}
          onChange={handleInputChange}
        />
        <div>
          <TextInput
            name="brand"
            label="Brand"
            value={productInfo.brand.name}
            error={errors.brand}
            onChange={handleBrandChange}
            onBlur={() => {
              setTimeout(() => {
                setSuggestions([]);
              }, 100);
            }}
          />
          {suggestions && suggestions.length > 0 && (
            <Suggestions>
              {suggestions.map((suggestion, i) => (
                <Suggestion
                  key={i}
                  onClick={() => handleSuggestClick(suggestion)}
                >
                  {suggestion.name}
                </Suggestion>
              ))}
            </Suggestions>
          )}
        </div>
        <Flex gap="1rem">
          <TextInput
            label="Current Price"
            name="current"
            prefix="$"
            error={errors.price}
            value={productInfo.price!.current}
            onChange={handlePriceChange}
          />
          <TextInput
            label="Previous Price"
            name="previous"
            prefix="$"
            onChange={handlePriceChange}
          />
        </Flex>
        <TextInput
          label="Size"
          name="size"
          placeholder="e.g. 120g"
          value={productInfo.size}
          onChange={handleInputChange}
        />
      </Section>
      <Section bgColor="#fff" gap="1rem" padding="1.25rem" margin="1rem 0">
        <div>
          <Body
            variant="body_small"
            color={neutral[500]}
            bold="medium"
            padding="0 0 0.65rem"
          >
            Category 1
          </Body>
          <Select
            options={categories.data}
            onChange={handleCategorySelect("category1")}
            fullWidth
          />
          {errors.category1 && (
            <Body variant="body_xsmall" color="red" padding="0.625rem 0 0">
              {errors.category1}
            </Body>
          )}
        </div>
        <div>
          <Body
            variant="body_small"
            color={neutral[500]}
            bold="medium"
            padding="0 0 0.65rem"
          >
            Category 2
          </Body>
          <Select
            options={productInfo.category1!.subCategory}
            onChange={handleCategorySelect("category2")}
            fullWidth
          />
        </div>
      </Section>
      <Section bgColor="#fff" gap="1rem" padding="1.25rem" margin="1rem 0">
        <div>
          <Body
            variant="body_small"
            color={neutral[500]}
            bold="medium"
            padding="0 0 0.65rem"
          >
            Product Image
          </Body>
          <ImageUpload>
            <label>
              <Flex justifyContent="center" flexCol height="10rem">
                <Image width={20} height={20} color={neutral[500]} stroke={2} />
                <Body variant="body_small" color={neutral[500]}>
                  Click to upload
                </Body>
              </Flex>
              <input type="file" name="image" onChange={handleImageFile} />
            </label>
            <div className="preview">
              {previewSource && <img src={previewSource} alt="chosen" />}
            </div>
          </ImageUpload>
        </div>

        <TextArea
          label="Description"
          name="description"
          value={productInfo.description}
          onChange={handleInputChange}
        />
      </Section>
      <Button
        label="Add"
        color={primaryColor.button}
        handleClick={handleSubmit}
      />
    </Div>
  );
};

const ImageUpload = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2rem;

  label {
    display: flex;
    justify-content: center;
    border: 1px dashed ${neutral[300]};
    border-radius: 0.35rem;
    height: 10rem;
    cursor: pointer;
  }

  input {
    display: none;
  }

  .preview {
    overflow: hidden;
    height: 10rem;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Suggestions = styled.ul`
  background-color: ${neutral[10]};
  border-left: 1px solid ${neutral[200]};
  border-right: 1px solid ${neutral[200]};
`;

const Suggestion = styled.li`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid ${neutral[200]};

  &:hover {
    background-color: ${neutral[100]};
  }
`;

export default AddProduct;

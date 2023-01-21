import React, { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";

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
import { categoryList } from "../../data/category";
import {
  ProductErrorIF,
  ProductIF,
  ProductWithCategoryIF,
} from "../../interfaces/productInterface";
import { productValidate } from "../../utils/validate";

//redux
import { useDispatch, useSelector } from "react-redux";
import { addProduct, reset } from "../../redux/productActionsReducer";
import { RootState } from "../../redux/store";

const AddProduct = () => {
  const dispatch = useDispatch();
  const [productInfo, setProductInfo] = useState<ProductWithCategoryIF>({
    name: "",
    brand: "",
    price: "",
    size: "",
    category1: {
      id: 0,
      value: "",
      label: "",
      subcategory: [],
    },
    category2: {
      id: 0,
      value: "",
      label: "",
    },
    img: "",
    description: "",
  });

  const [errors, setErrors] = useState<ProductErrorIF>({});

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const userInput = { ...productInfo };
    userInput[name as keyof ProductIF] = value;
    setProductInfo(userInput);
  };

  const handleCategorySelect =
    (name: string) => (e: ChangeEvent<HTMLSelectElement>) => {
      const { value } = e.target;

      setProductInfo({
        ...productInfo,
        [name]:
          name === "category1"
            ? categoryList[parseInt(value)]
            : productInfo.category1!.subcategory![parseInt(value)],
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
    const product = { ...productInfo, img: previewSource };
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
      brand: "",
      price: "",
      size: "",
      category1: {
        id: 0,
        value: "",
        label: "",
        subcategory: [],
      },
      category2: {
        id: 0,
        value: "",
        label: "",
      },
      img: "",
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
      <Header title="Add Product" />
      <Breadcrumbs
        category1={{ title: "Home", link: "/home" }}
        category2={{ title: "Add Product" }}
      />
      <Section bgColor="#fff" gap=".875rem" padding="1.25rem" margin="1rem 0">
        <TextInput
          label="Product Name"
          name="name"
          error={errors.name}
          onChange={handleInputChange}
        />
        <TextInput
          label="Brand"
          name="brand"
          error={errors.brand}
          onChange={handleInputChange}
        />
        <Flex gap="1rem">
          <TextInput
            label="Price"
            name="price"
            error={errors.price}
            onChange={handleInputChange}
          />
          <TextInput label="Size" name="size" onChange={handleInputChange} />
        </Flex>
      </Section>
      <Section bgColor="#fff" gap=".875rem" padding="1.25rem" margin="1rem 0">
        <div>
          <Body variant="body_small" bold="bold" padding="0 0 0.65rem">
            Category 1
          </Body>
          <Select
            options={categoryList}
            onChange={handleCategorySelect("category1")}
            fullWidth
          />
          {errors.category1 && (
            <Body variant="body_small">Category1 is required</Body>
          )}
        </div>
        <div>
          <Body variant="body_small" bold="bold" padding="0 0 0.65rem">
            Category 2
          </Body>
          <Select
            options={productInfo.category1!.subcategory}
            onChange={handleCategorySelect("category2")}
            fullWidth
          />
        </div>
      </Section>
      <Section bgColor="#fff" gap=".875rem" padding="1.25rem" margin="1rem 0">
        <div>
          <Body variant="body_small" bold="bold" padding="0 0 0.65rem">
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
              <input type="file" name="img" onChange={handleImageFile} />
            </label>
            <div className="preview">
              {previewSource && <img src={previewSource} alt="chosen" />}
            </div>
          </ImageUpload>
        </div>

        <TextArea
          label="Description"
          name="description"
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

export default AddProduct;

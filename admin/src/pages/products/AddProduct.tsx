import React, { ChangeEvent, useState } from "react";

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
import { primaryColor } from "../../components/token";

//data
import { categoryList } from "../../data/category";
import {
  ProductIF,
  ProductWithCategoryIF,
} from "../../interfaces/productInterface";

const AddProduct = () => {
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

  const [errors, setErrors] = useState<ProductIF>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  return (
    <Div>
      <Header title="Add Product" />
      <Breadcrumbs
        category1={{ title: "Home", link: "/home" }}
        category2="Add Product"
      />
      <Section bgColor="#fff" padding="1.25rem" margin="1rem 0">
        <TextInput
          name="name"
          label="Product Name"
          error={errors.name}
          onChange={handleInputChange}
        />
        <TextInput label="Brand" />
        <Flex gap="1rem">
          <TextInput label="Price" />
          <TextInput label="Size" />
        </Flex>
      </Section>
      <Section bgColor="#fff" padding="1.25rem" margin="1rem 0">
        <Body variant="caption" padding="0 0 .25rem 0">
          Category 1
        </Body>
        <Select
          options={categoryList}
          onChange={handleCategorySelect("category1")}
          fullWidth
        />
        <Body variant="caption" padding="0 0 .25rem 0">
          Category 2
        </Body>
        <Select
          options={productInfo.category1!.subcategory}
          onChange={handleCategorySelect("category2")}
          fullWidth
        />
      </Section>
      <Section bgColor="#fff" padding="1.25rem" margin="1rem 0">
        <h4>Product Image</h4>
        <input
          type="file"
          name="img"
          // value={data.img}
          onChange={handleImageFile}
        />
        {previewSource && (
          <img src={previewSource} alt="chosen" style={{ width: "100%" }} />
        )}
        <TextArea label="Description" />
      </Section>
      <Button label="Add" color={primaryColor.button} />
    </Div>
  );
};

export default AddProduct;

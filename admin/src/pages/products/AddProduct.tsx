import React, { ChangeEvent, useState } from "react";

//comp
import Breadcrumbs from "../../components/Breadcrumbs";
import { Div } from "../../components/containers/Div";
import { Section } from "../../components/containers/Section";
import { Header } from "../../components/Header";
import Select from "../../components/Select";
import { Body } from "../../components/Text";
import { TextInput } from "../../components/TextInput";

//data
import { categoryList } from "../../data/category";
import { Product } from "../../interfaces/productInterface";

const AddProduct = () => {
  const [productInfo, setProductInfo] = useState<Product>({
    name: "",
    brand: "",
    sku: "",
    price: "",
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
    size: "",
  });

  const handleCategory =
    (name: string) => (event: ChangeEvent<HTMLSelectElement>) => {
      setProductInfo({
        ...productInfo,
        [name]:
          name === "category1"
            ? categoryList[event.target.value]
            : productInfo.category1.subcategory![event.target.value],
      });
    };

  return (
    <Div>
      <Header title="Add Product" />
      <Breadcrumbs
        category1={{ title: "Home", link: "/home" }}
        category2="Add Product"
      />
      <Section bgColor="#fff" padding="1.25rem">
        <TextInput label="Product Name" />
        <TextInput label="Brand" />
        <TextInput label="Price" />
      </Section>
      <Section bgColor="#fff" padding="1.25rem">
        <Body variant="caption" padding="0 0 .25rem 0">
          Category 1
        </Body>
        <Select
          options={categoryList}
          selected={productInfo.category1.value}
          onChange={handleCategory("category1")}
          fullWidth
        />
      </Section>
    </Div>
  );
};

export default AddProduct;

import React from "react";

//comp
import { Div } from "../../components/containers/Div";
import { Header } from "../../components/Header";
import Breadcrumbs from "../../components/Breadcrumbs";
import { Section } from "../../components/containers/Section";
import BrandsList from "./components/BrandsList";
import AddNewBrand from "./components/AddNewBrand";

const Brands = () => {
  return (
    <Div>
      <Header title="Brands" textAlign="left" />
      <Breadcrumbs
        category1={{ title: "Settings" }}
        category2={{ title: "Brands" }}
      />
      <Section bgColor="#fff" padding="1.5rem" margin="1rem 0">
        <BrandsList />
      </Section>
      <Section bgColor="#fff" gap=".875rem" padding="1.25rem" margin="1rem 0">
        <Header small title="Add New Brand" margin="0 0 1.75rem 0" />
        <AddNewBrand />
      </Section>
    </Div>
  );
};

export default Brands;

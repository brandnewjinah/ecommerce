import React from "react";

//comp
import { Div } from "../../components/containers/Div";
import { Header } from "../../components/Header";
import Breadcrumbs from "../../components/Breadcrumbs";
import { Section } from "../../components/containers/Section";
import CategoryList from "./components/CategoryList";
import AddNewCategory from "./components/AddNewCategory";

const Categories = () => {
  return (
    <Div>
      <Header title="Categories" textAlign="left" />
      <Breadcrumbs
        category1={{ title: "Settings" }}
        category2={{ title: "Categories" }}
      />
      <Section bgColor="#fff" padding="1.5rem" margin="1rem 0">
        <CategoryList />
      </Section>
      <Section bgColor="#fff" gap=".875rem" padding="1.25rem" margin="1rem 0">
        <Header small title="Add New Category" margin="0 0 1.75rem 0" />
        <AddNewCategory />
      </Section>
    </Div>
  );
};

export default Categories;

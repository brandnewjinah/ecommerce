import React from "react";
import styled from "styled-components";

import { categories } from "../../../data/demo/demoHome";
import CategoryItem from "./CategoryItem";

const Categories = () => {
  return (
    <Container>
      {categories.map((item) => (
        <CategoryItem item={item} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2.5rem;
`;

export default Categories;

import React from "react";
import styled from "styled-components";

import { categories } from "../data/demoHome";
import CategoryItem from "./CategoryItem";

const Categories = () => {
  return (
    <Container>
      {categories.map((item, idx) => (
        <CategoryItem key={idx} item={item} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  padding: 2.5rem;
`;

export default Categories;

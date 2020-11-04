import React, { FC } from "react";

//import styles and assets
import styled from "styled-components";

interface Props {}

const Category2: FC<Props> = () => {
  return <Wrapper>Category 2</Wrapper>;
};

const Wrapper = styled.div``;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 1fr;
`;

export default Category2;

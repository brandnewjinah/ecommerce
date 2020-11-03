import React, { FC } from "react";

//import styles and assets
import styled from "styled-components";

interface Props {}

const Category3: FC<Props> = () => {
  return <Wrapper>Category 3</Wrapper>;
};

const Wrapper = styled.div`
  width: 100%;
  max-width: 1360px;
  margin: 0 auto;
`;

export default Category3;

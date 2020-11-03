import React, { FC } from "react";

//import componnets

//import styles and assets
import styled from "styled-components";

interface Props {}

const Home: FC<Props> = () => {
  return <Wrapper>home</Wrapper>;
};

const Wrapper = styled.div`
  width: 100%;
  max-width: 1360px;
  margin: 0 auto;
`;

export default Home;

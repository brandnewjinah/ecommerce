import React, { FC } from "react";

//import styles and assets
import styled from "styled-components";

interface Props {}

const Footer: FC<Props> = () => {
  return <Wrapper>Footer</Wrapper>;
};

const Wrapper = styled.div`
  background-color: aliceblue;
  padding: 0 2em;
`;

export default Footer;

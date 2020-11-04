import React, { FC } from "react";

//import styles and assets
import styled from "styled-components";

interface Props {}

const Header: FC<Props> = () => {
  return <Wrapper>Header</Wrapper>;
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  background-color: #fff;
  height: 70px;
  box-shadow: 0 0 1em 0.75em rgba(18, 38, 63, 0.02);
`;

export default Header;

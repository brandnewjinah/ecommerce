import React, { FC } from "react";

//import styles and assets
import styled from "styled-components";

interface Props {}

const Header: FC<Props> = () => {
  return <Wrapper>Header</Wrapper>;
};

const Wrapper = styled.div`
  background-color: aliceblue;
`;

export default Header;

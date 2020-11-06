import React, { FC } from "react";

//import styles and assets
import styled from "styled-components";

interface Props {}

const Header: FC<Props> = () => {
  return (
    <Wrapper>
      <Container>
        <Left>Logo</Left>
        <Right>Login</Right>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  z-index: 20;
  display: flex;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 1em 0.75em rgba(18, 38, 63, 0.02);
`;

const Container = styled.div`
  width: 100%;
  max-width: 1340px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1em;
  margin: 0 auto;
`;

const Left = styled.div``;

const Right = styled.div``;

export default Header;

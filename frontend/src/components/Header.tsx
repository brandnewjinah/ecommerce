import React, { FC } from "react";
import { Link } from "react-router-dom";

//import styles and assets
import styled from "styled-components";

interface Props {}

const Header: FC<Props> = () => {
  return (
    <Wrapper>
      <Container>
        <Left>left</Left>
        <Right className="flex">
          <Link to="/signup">
            <div>Signup</div>
          </Link>
          <Link to="/login">
            <div>Login</div>
          </Link>
        </Right>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  background-color: #d6edbf;

  .flex {
    display: flex;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 1360px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
`;

const Left = styled.div``;

const Right = styled.div`
  div {
    margin-left: 1.5em;
  }
`;

export default Header;

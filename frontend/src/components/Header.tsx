import React, { FC } from "react";
import { Link } from "react-router-dom";

//import styles and assets
import styled from "styled-components";

interface Props {
  user?: any;
}

const Header: FC<Props> = (props) => {
  return (
    <Wrapper>
      <Container>
        <Left>left</Left>
        <Right className="flex">
          {!props.user && (
            <>
              <Link to="/signup">
                <div>Signup</div>
              </Link>
              <Link to="/login">
                <div>Login</div>
              </Link>
            </>
          )}
          {props.user && <div>Hi, {props.user.name}</div>}
        </Right>
      </Container>
      <Logo>Logo</Logo>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

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
  font-size: 0.875rem;
  padding: 0 2em;
  margin: 0 auto;
`;

const Left = styled.div``;

const Right = styled.div`
  div {
    margin-left: 1.5em;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  padding: 1em 0 2em 0;
  margin: 0 auto;
`;
export default Header;

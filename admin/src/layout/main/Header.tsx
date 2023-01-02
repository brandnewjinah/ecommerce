import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

//comp
import { Div, Flex } from "../../components/containers/Div";
import { neutral } from "../../components/token";

const Nav = () => {
  return (
    <Header>
      <Flex padding="1rem 1.25rem">
        <Left>
          <Link to="/home">sweet</Link>
        </Left>
        <Div>
          <Avatar>A</Avatar>
        </Div>
      </Flex>
    </Header>
  );
};

const Header = styled.header`
  border-bottom: 1px solid ${neutral[100]};
`;

const Left = styled.div`
  flex: 1;
  font-family: "Raleway", sans-serif;
  font-weight: 600;
  font-size: 1.25rem;
  letter-spacing: 0.025rem;
  text-transform: lowercase;
`;

const Avatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: green;
  color: white;
  cursor: pointer;
`;

export default Nav;

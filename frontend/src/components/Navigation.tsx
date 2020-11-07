import React, { FC } from "react";
import { Link } from "react-router-dom";

//import styles and assets
import styled from "styled-components";

interface Props {}

const Navigation: FC<Props> = () => {
  return (
    <Wrapper>
      <Link to="/">
        <Category>Home</Category>
      </Link>
      <Link to="/1">
        <Category>Category</Category>
      </Link>
      <Link to="/2">
        <Category>Category</Category>
      </Link>
      <Link to="/3">
        <Category>Category</Category>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
  padding: 0.5em 0;
`;

const Category = styled.div`
  margin: 0 2em;
`;

export default Navigation;

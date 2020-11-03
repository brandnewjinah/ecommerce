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
  background-color: aliceblue;
  display: flex;
  flex-direction: column;
`;

const Category = styled.div`
  margin: 0 2em;
`;

export default Navigation;

import React from "react";
import styled from "styled-components";

//token
import { breakpoint } from "../token";

const Grid = ({ children }) => {
  return <GridContainer>{children}</GridContainer>;
};

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2rem;

  @media ${breakpoint.lg} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media ${breakpoint.m} {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 1rem;
  }
`;

export default Grid;

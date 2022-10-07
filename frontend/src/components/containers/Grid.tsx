import React, { FC } from "react";
import styled from "styled-components";

//token
import { breakpoint } from "../token";

interface Props {
  breakpointLg?: string;
}

const Grid: FC<Props> = ({ breakpointLg, children }) => {
  return <GridContainer breakpointLg={breakpointLg}>{children}</GridContainer>;
};

const GridContainer = styled.div<Props>`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2rem;

  @media ${breakpoint.lg} {
    /* grid-template-columns: repeat(3, 1fr); */
    grid-template-columns: ${(props) =>
      props.breakpointLg ? props.breakpointLg : `repeat(3, 1fr)`};
  }

  @media ${breakpoint.m} {
    grid-template-columns: ${(props) =>
      props.breakpointLg ? props.breakpointLg : `repeat(2, 1fr)`};
    grid-column-gap: 1rem;
  }
`;

export default Grid;

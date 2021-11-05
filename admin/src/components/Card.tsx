import React, { FC } from "react";
import styled from "styled-components";

export interface Props {
  margin?: string;
}

export const Card: FC<Props> = ({ children, margin }) => {
  return <Container margin={margin}>{children}</Container>;
};

const Container = styled.section<Props>`
  width: 100%;
  border-radius: 0.25rem;
  background-color: #fff;
  box-shadow: 0 0.5rem 1.5rem rgb(18 38 63 / 3%);
  padding: 1rem;
  margin: ${(props) => props.margin && props.margin};
`;

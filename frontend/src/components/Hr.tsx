import React, { FC } from "react";
import styled from "styled-components";

interface Props {
  color?: string;
}

const Hr: FC<Props> = ({ color }) => {
  return <HorizontalRule color={color} />;
};

const HorizontalRule = styled.div<Props>`
  width: 100%;
  border-top: 0.75px solid;
  border-top-color: ${(props) => props.color && props.color};
`;

export default Hr;

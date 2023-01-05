import React, { FC } from "react";
import styled from "styled-components";

//comp
import { Body } from "./Text";
import { fontSize } from "./token";

interface Props {
  overline?: string;
  title?: string;
  body?: string;
  caption?: string;
  textAlign?: string;
  margin?: string;
}

export const Header: FC<Props> = ({
  title,
  body,
  textAlign,
  caption,
  margin,
}) => {
  return (
    <HeaderWrapper margin={margin} textAlign={textAlign}>
      <h1>{title}</h1>
      {body && <Body variant="body_small">{body}</Body>}
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header<Props>`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  text-align: ${(props) => props.textAlign && props.textAlign};
  margin: ${(props) => props.margin && props.margin};

  h1 {
    font-size: ${fontSize.lg2};
    font-weight: 500;
    text-transform: uppercase;
  }
`;
import React, { FC } from "react";
import styled from "styled-components";

//comp
import { Body } from "./Text";
import { fontSize, neutral } from "./token";

interface Props {
  overline?: string;
  title?: string;
  body?: string;
  caption?: string;
  margin?: string;
}

export const Header: FC<Props> = ({ title, body, caption, margin }) => {
  return (
    <HeaderWrapper margin={margin}>
      <h1>{title}</h1>
      {body && <Body variant="body_small">{body}</Body>}
      {caption && (
        <Body variant="body_xsmall" color={neutral[400]}>
          {caption}
        </Body>
      )}
    </HeaderWrapper>
  );
};

export const HeaderSmall: FC<Props> = ({ title, body, margin }) => {
  return (
    <HeaderWrapperSmall margin={margin}>
      <h1>{title}</h1>
      {body && <p>{body}</p>}
    </HeaderWrapperSmall>
  );
};

export const ProductHeader: FC<Props> = ({ overline, title, body }) => {
  return (
    <ProductHeaderWrapper>
      {overline && (
        <Body variant="body_small" color={neutral[400]}>
          {overline}
        </Body>
      )}
      <h1>{title}</h1>
      {body && <p>{body}</p>}
    </ProductHeaderWrapper>
  );
};

const HeaderWrapper = styled.header<Props>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
  margin: ${(props) => props.margin && props.margin};

  h1 {
    font-size: ${fontSize.lg2};
    font-weight: 500;
    text-transform: uppercase;
  }
`;

const HeaderWrapperSmall = styled(HeaderWrapper)`
  gap: 0.75rem;
`;

const ProductHeaderWrapper = styled.div`
  h1 {
    font-size: 1.125rem;
    font-weight: 500;
  }
`;

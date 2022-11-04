import React from "react";
import styled from "styled-components";

//token
import { fontSize } from "../components/token";

export const Header = ({ title, body }) => {
  return (
    <HeaderWrapper>
      <h1>{title}</h1>
      {body && <p>{body}</p>}
    </HeaderWrapper>
  );
};

export const HeaderSmall = ({ title, body }) => {
  return (
    <HeaderWrapperSmall>
      <h1>{title}</h1>
      {body && <p>{body}</p>}
    </HeaderWrapperSmall>
  );
};

const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: center;

  h1 {
    font-size: ${fontSize.lg2};
    font-weight: 500;
    text-transform: uppercase;
  }
`;

const HeaderWrapperSmall = styled(HeaderWrapper)`
  gap: 0.75rem;

  h1 {
    font-size: ${fontSize.lg3};
    font-weight: 400;
    text-transform: capitalize;
  }
`;
import React from "react";
import styled from "styled-components";

//token
import { fontScale } from "../token";

export const Header = ({ title, body }) => {
  return (
    <HeaderWrapper>
      <h1>{title}</h1>
      {body && <p>{body}</p>}
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: center;

  h1 {
    font-size: ${fontScale.scale_b7};
    text-transform: capitalize;
  }
`;

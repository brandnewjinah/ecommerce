import React from "react";
import styled from "styled-components";

//token
import { breakpoint } from "../components/token";

export const Container = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export const HeaderContainer = ({ title, body }) => {
  return (
    <HeaderWrapper>
      <h1>{title}</h1>
      {body && <p>{body}</p>}
    </HeaderWrapper>
  );
};

export const FilterContainer = ({ children }) => {
  return <FilterWrapper>{children}</FilterWrapper>;
};

const Wrapper = styled.div`
  max-width: 90rem;
  padding: 0 1.5rem;
  margin: 4rem auto;

  @media ${breakpoint.m} {
    margin: 3rem auto;
  }
`;

const HeaderWrapper = styled.header`
  text-align: center;

  h1 {
    text-transform: uppercase;
    letter-spacing: 0.05rem;
  }

  p {
    padding: 1rem 0;
  }
`;

const FilterWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 0;

  @media ${breakpoint.m} {
    flex-direction: column;
    padding: 0.5rem 0 1.5rem;
  }
`;

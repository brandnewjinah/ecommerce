import React from "react";
import styled from "styled-components";

//token
import { breakpoint } from "../token";

export const Container = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export const ContainerSmall = ({ children }) => {
  return <WrapperSmall>{children}</WrapperSmall>;
};

export const HeaderContainer = ({ title, body }) => {
  return (
    <HeaderWrapper>
      <h3>{title}</h3>
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

const WrapperSmall = styled(Wrapper)`
  max-width: 80rem;
`;

const HeaderWrapper = styled.div`
  text-align: center;

  h3 {
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

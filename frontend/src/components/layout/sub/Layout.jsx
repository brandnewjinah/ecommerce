import React from "react";

import styled from "styled-components";

import Side from "./Side";
import { breakpoint } from "../../token";

const Layout = ({ children }) => {
  return (
    <Container>
      <Side />
      <Main>{children}</Main>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 2rem;
  padding: 0 1.5rem;
  margin: 4rem auto;

  @media ${breakpoint.lg} {
    flex-direction: column;
    margin: 3rem auto;
  }
`;

const Main = styled.main`
  flex: 5;
`;

export default Layout;

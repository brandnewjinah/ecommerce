import React, { FC } from "react";
import styled from "styled-components";

//comp
import Side from "./Side";
import { breakpoint } from "../../components/token";

interface Props {
  children?: any;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <Container>
      <Side />
      <Main>{children}</Main>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  margin: 5.625rem auto;

  @media ${breakpoint.xlg} {
    padding: 0 1rem;
  }

  @media ${breakpoint.lg} {
    flex-direction: column;
    padding: 0;
    margin: 3rem auto;
  }
`;

const Main = styled.main<Props>`
  display: flex;
  flex-direction: column;
  flex: 4;
`;

export default Layout;

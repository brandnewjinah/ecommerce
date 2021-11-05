import React, { useState } from "react";
import styled from "styled-components";

//import components
import Header from "./Header";
import Sidebar from "./Sidebar";

//import token
import { blue, breakpoint } from "./token";

const Layout = ({ children }) => {
  const [sideOpen, setSideOpen] = useState(false);

  return (
    <Container>
      <Header handleOpen={setSideOpen} />
      <MainWrapper>
        <Sidebar sideOpen={sideOpen} handleOpen={setSideOpen} />
        <Content>{children}</Content>
      </MainWrapper>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${blue[100]};

  .content {
    width: 100%;
    padding: 2rem;
  }
`;

const MainWrapper = styled.div`
  display: flex;
`;

const Content = styled.div`
  flex: 4;
  width: 100%;
  padding: 2rem;

  @media ${breakpoint.lg} {
    flex: 1;
  }
`;

export default Layout;

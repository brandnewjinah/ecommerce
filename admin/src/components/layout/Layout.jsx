import React, { useState } from "react";
import styled from "styled-components";

//comp
import Header from "./Header";
import Navigation from "./Navigation";

//import tokens
import { neutral, breakpoint } from "../token";

const Layout = ({ children }) => {
  const [sideOpen, setSideOpen] = useState(false);

  return (
    <Container>
      <Header handleOpen={setSideOpen} />
      <Overlay sideOpen={sideOpen} onClick={() => setSideOpen(!sideOpen)} />
      <Main>
        <Navigation sideOpen={sideOpen} handleOpen={setSideOpen} />
        <Content>{children}</Content>
      </Main>
    </Container>
  );
};

const Container = styled.div``;

const Overlay = styled.div`
  display: block;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  visibility: ${(props) => (props.sideOpen ? "visible" : "hidden")};
  opacity: ${(props) => (props.sideOpen ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
`;

const Main = styled.div`
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

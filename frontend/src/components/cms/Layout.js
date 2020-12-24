import React from "react";

//import components
import Header from "./Header";
import Navigation from "./Navigation";

//import styles and assets
import styled from "styled-components";
import colors from "../Colors";

const Layout = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <Container>
        <div className="nav">
          <Navigation />
        </div>
        <Main>
          <Content>{children}</Content>
        </Main>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  @media (max-width: 780px) {
    .nav {
      display: none;
    }
  }
`;

const Container = styled.main`
  display: flex;
`;

const Main = styled.section`
  flex: 1;
  min-height: 100vh;
  background-color: ${colors.faintgray};
  margin-left: 250px;

  @media (max-width: 780px) {
    margin-left: 0;
  }
`;

const Content = styled.div`
  padding: 2em;
`;

export default Layout;

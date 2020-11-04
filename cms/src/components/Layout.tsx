import React, { FC } from "react";

//import components
import Header from "./Header";
import Navigation from "./Navigation";
import Footer from "./Footer";

//import styles and assets
import styled from "styled-components";

interface Props {
  children?: any;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <Container>
        <Navigation />
        <Main>
          <Content>{children}</Content>
          <Footer />
        </Main>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Container = styled.main`
  display: flex;
`;

const Main = styled.section`
  flex: 1;
  background-color: #fcfcfc;
  margin-left: 250px;
  margin-top: 70px;
`;

const Content = styled.div`
  padding: 2em;
`;

export default Layout;

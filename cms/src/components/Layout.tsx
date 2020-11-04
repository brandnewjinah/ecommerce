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
        <div className="main">{children}</div>
      </Container>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Container = styled.div`
  display: flex;

  .main {
    flex: 1;
    background-color: #fcfcfc;
    padding: 1em;
  }
`;

export default Layout;

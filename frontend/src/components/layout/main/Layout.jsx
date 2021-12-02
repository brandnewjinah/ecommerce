import React from "react";
import styled from "styled-components";

//import components
import Announcement from "./Announcement";
import Navbar from "./Navbar";
import Footer from "./Footer";

//token
import { breakpoint, size } from "../../token";

const Layout = ({ children }) => {
  return (
    <Wrapper>
      <Announcement />
      <Navbar />
      <Container>{children}</Container>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  min-height: 100vh;
  background-color: ${(props) => props.bgColor};
`;

const Container = styled.main`
  width: 100%;
  max-width: ${size.xlg};
  margin: 4rem auto;
  padding-bottom: 304px;

  @media ${breakpoint.lg} {
    padding-bottom: 709px;
  }
`;

export default Layout;

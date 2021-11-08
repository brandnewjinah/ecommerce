import React from "react";
import styled from "styled-components";

//import components
import Announcement from "./Announcement";
import Navbar from "./Navbar";
import Footer from "./Footer";

//token
import { breakpoint } from "../token";

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
  padding-bottom: 236px;

  @media ${breakpoint.lg} {
    padding-bottom: 460px;
  }
`;

export default Layout;

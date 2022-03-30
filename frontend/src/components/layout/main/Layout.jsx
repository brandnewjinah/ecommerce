import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

//import components
import Announcement from "./Announcement";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { breakpoint, size } from "../../token";

const Layout = ({ children }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [open, setOpen] = useState(false);

  useEffect(() => {
    //disable body scroll when mobile menu is open
    const width = window.innerWidth;
    const body = document.querySelector("body");
    body.style.overflow = width < 1025 && open ? "hidden" : "auto";
  }, [open]);

  return (
    <Wrapper>
      <Announcement />
      <Navbar open={open} handleOpen={setOpen} />
      <Container open={open} path={path}>
        {children}
      </Container>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  min-height: 100vh;
`;

const Container = styled.main`
  width: 100%;
  max-width: ${size.xlg};
  padding-bottom: 304px;
  margin: ${(props) =>
    props.path === "home" || props.path === "product"
      ? `2rem auto`
      : `4rem auto`};

  @media ${breakpoint.lg} {
    padding: 0 1rem 697px;
    margin: ${(props) =>
      props.path === "home" || props.path === "product"
        ? `1rem auto`
        : `2rem auto`};
  }
`;

export default Layout;

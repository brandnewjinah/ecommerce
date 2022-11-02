import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";

//comp
import Announcement from "../components/Announcement";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { breakpoint, size } from "../components/token";

const Layout = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const path = location.pathname.split("/")[1];

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
      <Main open={open} path={path}>
        <Outlet />
      </Main>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  min-height: 100vh;
`;

const Main = styled.main`
  max-width: ${(props) => (props.path !== "home" ? size.xl : "none")};
  padding-bottom: 298px;

  @media ${breakpoint.lg} {
    padding-bottom: 900px;
  }
`;

export default Layout;

import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

//comp
import { breakpoint, neutral, size } from "../components/token";

const Layout = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    //disable body scroll when mobile menu is open
    const width = window.innerWidth;
    const body = document.querySelector("body");
    body.style.overflow = width < 1025 && open ? "hidden" : "auto";
  }, [open]);

  return (
    <Wrapper>
      <Main open={open}>
        <Outlet />
      </Main>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  min-height: 100vh;
  background-color: ${neutral[50]};
`;

const Main = styled.main`
  max-width: ${size.xl};
  margin: 0 auto;
  padding: 4rem 1rem 0;

  @media ${breakpoint.lg} {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

export default Layout;

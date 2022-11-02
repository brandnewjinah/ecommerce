import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

//comp
import Announcement from "../components/Announcement";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <Wrapper>
      <Announcement />
      <Navbar />
      <Main>
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

const Main = styled.main``;

export default Layout;

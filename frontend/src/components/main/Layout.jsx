import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import jwtDecode from "jwt-decode";

//import components
import Announcement from "./components/Announcement";
import Navbar from "./components/Navbar";
import Footer from "./Footer";

//token
import { primaryColor } from "../token";

const Layout = ({ children }) => {
  let location = useLocation();
  const [user, setUser] = useState();

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const user = jwtDecode(token);
      setUser(user);
    } catch (ex) {
      setUser(null);
    }
  }, []);

  return (
    <Wrapper
      bgColor={
        location.pathname.includes("/home")
          ? primaryColor.faintBackground
          : null
      }
    >
      {/* <Announcement /> */}
      <Navbar />
      <Container>{children}</Container>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${(props) => props.bgColor};
`;

const Container = styled.main`
  width: 100%;
`;

export default Layout;

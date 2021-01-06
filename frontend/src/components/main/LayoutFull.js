import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

//import components
import Footer from "./Footer";
import Header from "./Header";

//import styles and assets
import styled from "styled-components";

const Layout = ({ children }) => {
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
    <Wrapper>
      <Header user={user} />
      <Container>
        <div>{children}</div>
      </Container>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Container = styled.main`
  width: 100%;
  /* max-width: 1024px; */
  /* padding: 0 2em; */
  margin: 0 auto;
`;

export default Layout;

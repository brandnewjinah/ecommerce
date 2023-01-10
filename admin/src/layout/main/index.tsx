import React, { useState } from "react";
import { Outlet, Navigate } from "react-router";
import styled from "styled-components";

//comp
import Header from "./Header";
import Sidebar from "./Sidebar";

//redux
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { neutral } from "../../components/token";

const Layout = () => {
  const [sideOpen, setSideOpen] = useState(false);
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const isAdmin = currentUser.isAdmin;

  // return isAdmin ? (
  //   <Container>
  //     <Header />
  //     <Main>
  //       <Sidebar sideOpen={sideOpen} handleOpen={setSideOpen} />
  //       <Content>
  //         <Outlet />
  //       </Content>
  //     </Main>
  //   </Container>
  // ) : (
  //   <Navigate to="/" />
  // );
  return (
    <Container>
      <Header />
      <Main>
        <Sidebar sideOpen={sideOpen} handleOpen={setSideOpen} />
        <Content>
          <Outlet />
        </Content>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  overflow: hidden;
`;

const Main = styled.div`
  display: flex;
  flex-grow: 1;
  position: relative;
  overflow: hidden;
`;

const Content = styled.div`
  background-color: ${neutral[50]};
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  min-width: 0;
  padding: 2rem 1.5rem;
  overflow-y: auto;
`;

export default Layout;

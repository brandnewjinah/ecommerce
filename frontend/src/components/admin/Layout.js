import React, { useState } from "react";
import styled from "styled-components";

//import components
import Header from "./Header";
import Sidebar from "./Sidebar";

//import token
import { blue } from "../token";

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <Wrapper>
      <Header handleOpen={setOpen} />
      <div className="flex">
        <Sidebar open={open} handleOpen={setOpen} />
        <div className="content flexFour">{children}</div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${blue[100]};

  .content {
    width: 100%;
    padding: 2rem;
  }
`;

export default Layout;

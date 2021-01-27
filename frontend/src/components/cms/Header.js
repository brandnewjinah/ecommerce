import React, { useState } from "react";
import { Link } from "react-router-dom";

//import styles and assets
import styled from "styled-components";
import colors from "../Colors";

const Header = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <Wrapper open={open}>
      <Container>
        <Link to="/">
          <Left>MYSHOP</Left>
        </Link>
        <Links open={open}>
          <Right className="flex">
            {/* {!props.user && (
              <>
                <Link to="/signup">
                  <div>Signup</div>
                </Link>
                <Link to="/login">
                  <div>Login</div>
                </Link>
              </>
            )}
            {props.user && <div>Hi, {props.user.name}</div>} */}
            <div>Welcome, Admin</div>
          </Right>
        </Links>
        <Mobile>
          {open ? (
            <div onClick={() => setOpen(!open)}>Close</div>
          ) : (
            <div onClick={() => setOpen(!open)}>Menu</div>
          )}
        </Mobile>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 3.5em;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 12;
  /* background-color: ${({ open }) => (open ? "#fff" : `yellow`)}; */
  background-color: #fff;
  border-bottom: 1px solid ${colors.lightergray};

  @media (max-width: 780px) {
    border-bottom: 1px solid ${colors.lightergray};
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  letter-spacing: 0.025rem;
  color: ${colors.darkergray};
  padding: 0 4em;
  /* background-color: azure; */
`;

const Left = styled.div`
  flex: 1 1 33.33%;
  font-size: 1.125rem;
  font-weight: 600;
  color: ${colors.darkergray};
  letter-spacing: 0.2rem;
  /* background-color: red; */
`;

const Links = styled.div`
  display: flex;
  flex: 1 1 66.66%;
  /* background-color: darkseagreen; */

  @media (max-width: 780px) {
    height: 100vh;
    background-color: #fff;
    flex-direction: column;
    position: absolute;
    top: 2em;
    left: 0;
    right: 0;
    overflow: hidden;
    padding: 1em;
    text-align: center;
    font-size: 1.75rem;
    font-weight: 500;
    z-index: 2;
    transform: ${({ open }) => (open ? "scale(1)" : "scale(0)")};

    a {
      margin: 0.5em;
    }
  }
`;

const Right = styled.div`
  display: flex;
  margin-left: auto;

  div {
    margin-left: 1.5em;
  }

  @media (max-width: 780px) {
    flex-direction: column;
    margin-left: 0;
    div {
      margin-left: 0;
    }
  }
`;

const Mobile = styled.div`
  /* background-color: darkslateblue; */
  display: none;
  cursor: pointer;

  @media (max-width: 780px) {
    display: block;
  }
`;

export default Header;

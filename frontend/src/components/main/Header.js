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
        <Left>MYSHOP</Left>
        <Links open={open}>
          <Center>
            <Link to="/collection">
              <Category>Collection</Category>
            </Link>
            <Link to="/products">
              <Category>Category</Category>
            </Link>
            <Link to="/products">
              <Category>Category</Category>
            </Link>
          </Center>
          <Right className="flex">
            {!props.user && (
              <>
                <Link to="/signup">
                  <div>Signup</div>
                </Link>
                <Link to="/login">
                  <div>Login</div>
                </Link>
              </>
            )}
            {props.user && <div>Hi, {props.user.name}</div>}
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
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ open }) => (open ? "#fff" : null)};
  border-bottom: 1px solid ${colors.lightergray};

  @media (max-width: 980px) {
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

  @media (max-width: 980px) {
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

const Center = styled.div`
  display: flex;

  @media (max-width: 980px) {
    flex-direction: column;
  }
`;

const Category = styled.div`
  margin: 0 2em;
`;

const Right = styled.div`
  display: flex;
  margin-left: auto;

  div {
    margin-left: 1.5em;
  }

  @media (max-width: 980px) {
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

  @media (max-width: 980px) {
    display: block;
  }
`;

export default Header;

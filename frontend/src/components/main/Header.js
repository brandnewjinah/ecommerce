import React, { useState } from "react";
import { Link } from "react-router-dom";

//import styles and assets
import styled from "styled-components";
import colors from "../Colors";
import { Cart } from "../../assets/Icons";

const Header = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <Wrapper open={open}>
      <Container>
        <Left>
          <Link to="/">MYSHOP</Link>
        </Left>
        <Links open={open}>
          <Center>
            <Link to="/products/all">
              <Category>All Products</Category>
            </Link>
            <Link to="/products/new">
              <Category>New</Category>
            </Link>
            <Link to="/products/best">
              <Category>Best</Category>
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
            <CartContainer>
              <div className="qty">4</div>
              <Cart width="18" height="18" color="#000" stroke="2" />
            </CartContainer>
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
  flex: 1 1 40%;
  font-size: 1.125rem;
  font-weight: 600;
  color: ${colors.darkergray};
  letter-spacing: 0.2rem;
  /* background-color: red; */
`;

const Links = styled.div`
  display: flex;
  flex: 1 1 60%;
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

const CartContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  .cartIcon {
    background-color: red;
  }

  .qty {
    position: absolute;
    top: 2px;
    left: -4px;
    color: #fff;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 18px;
    height: 18px;
    border-radius: 100%;
    background-color: red;
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

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
        <Logo>
          <Link to="/">MYSHOP</Link>
        </Logo>
        <Links open={open}>
          <Left>
            <Link to="/products/all" onClick={() => setOpen(false)}>
              <p>All Products</p>
            </Link>
            <Link to="/products/bakery" onClick={() => setOpen(false)}>
              <p>Bakery</p>
            </Link>
            <Link to="/products/beverages" onClick={() => setOpen(false)}>
              <p>Beverages</p>
            </Link>
            <Link to="/products/snacks" onClick={() => setOpen(false)}>
              <p>Snacks</p>
            </Link>
          </Left>
          <Right>
            <User>
              {!props.user && (
                <>
                  <Link to="/signup">
                    <p>Signup</p>
                  </Link>
                  <Link to="/login">
                    <p>Login</p>
                  </Link>
                </>
              )}
              {props.user && <div>Hi, {props.user.name}</div>}
            </User>
            <ShoppingCartWeb>
              <Cart width="16" height="16" color="#000" stroke="1" />
              <div className="qty">2</div>
            </ShoppingCartWeb>
          </Right>
        </Links>
        <Mobile>
          <Flex>
            <ShoppingCart>
              <Cart width="16" height="16" color="#000" stroke="1" />
              <div className="qty">2</div>
            </ShoppingCart>
            <Burger open={open} onClick={() => setOpen(!open)}>
              <div />
            </Burger>
          </Flex>
        </Mobile>
      </Container>
    </Wrapper>
  );
};

const Flex = styled.div`
  display: flex;
`;

const Wrapper = styled(Flex)`
  height: 3.5em;
  align-items: center;
  background-color: ${({ open }) => (open ? "#fff" : null)};
  border-bottom: 1px solid ${colors.lightergray};

  @media (max-width: 980px) {
    border-bottom: 1px solid ${colors.lightergray};
  }
`;

const Container = styled(Flex)`
  /* background-color: sandybrown; */
  width: 100%;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  letter-spacing: 0.025rem;
  color: ${colors.darkergray};
  padding: 0 4em;

  @media (max-width: 980px) {
    padding: 0 2em;
  }
`;

const Logo = styled.div`
  /* background-color: salmon; */
  flex: 1 1 30%;
  font-size: 1.125rem;
  font-weight: 600;
  color: ${colors.darkergray};
  letter-spacing: 0.2rem;
`;

const Links = styled(Flex)`
  /* background-color: powderblue; */
  flex: 1 1 70%;

  @media (max-width: 980px) {
    height: 100vh;
    background-color: white;
    flex-direction: column;
    position: absolute;
    top: 3em;
    left: 0;
    right: 0;
    overflow: hidden;
    padding: 0.5em;
    text-align: center;
    font-size: 1rem;
    font-weight: 500;
    z-index: 2;
    transform: ${({ open }) => (open ? "scale(1)" : "scale(0)")};
  }
`;

const Left = styled(Flex)`
  /* background-color: thistle; */
  justify-content: space-between;
  flex: 1 1 57.15%;

  p {
    margin: 0 1em;
  }

  @media (max-width: 980px) {
    flex-direction: column;
    flex: 0;

    p {
      line-height: 3rem;
    }
  }
`;

const Right = styled(Flex)`
  /* background-color: wheat; */
  justify-content: flex-end;
  flex: 1 1 42.85%;

  p {
    margin: 0 1em;
  }

  @media (max-width: 980px) {
    flex-direction: column;
    flex: 0;
    margin-left: 0;

    div {
      margin-left: 0;
    }
  }
`;

const User = styled.div`
  @media (max-width: 980px) {
    display: flex;
    flex-direction: column;

    p {
      line-height: 3rem;
    }
  }
`;

const ShoppingCart = styled(Flex)`
  align-items: center;
  border: 1px solid ${colors.lightgray};
  border-radius: 1em;
  padding: 0 1em;
  margin-left: 0.875em;

  .qty {
    line-height: 0.75rem;
    margin-left: 0.5em;
  }

  @media (max-width: 980px) {
    margin-right: 1.5em;
  }
`;

const ShoppingCartWeb = styled(ShoppingCart)`
  @media (max-width: 980px) {
    display: none;
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

const Burger = styled.div`
  width: 20px;
  height: 20px;
  position: relative;
  display: flex;
  align-items: center;
  z-index: 1;
  cursor: pointer;

  div {
    width: 100%;
    height: 1px;
    background-color: #000;
    display: flex;
    align-content: center;
    justify-content: center;
    transition: all 0.4s ease;
    opacity: ${({ open }) => (open ? 0 : 1)};
  }

  &:before,
  &:after {
    content: "";
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 1px;
    background-color: #000;
    transition: all 0.4s ease;
  }
  &:before {
    opacity: 1;
    transform: ${({ open }) =>
      open ? "rotate(45deg)" : "rotate(0) translateY(-6px)"};
  }

  &:after {
    opacity: 1;
    transform: ${({ open }) =>
      open ? "rotate(-45deg)" : "rotate(0) translateY(6px)"};
  }
`;

export default Header;

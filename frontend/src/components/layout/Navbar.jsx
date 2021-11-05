import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";

//components
import Hamburger from "./Hamburger";
import ModalAuth from "../ModalAuth";

//token
import { neutral, primaryColor, breakpoint, typeScale } from "../token";
import { Cart, Heart, ChevronDown } from "../../assets/Icon";

const Navbar = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const qty = useSelector((state) => state.cart.qty);
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [clickLogout, setClickLogout] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    // const token = user?.token;
    setUser(JSON.parse(localStorage.getItem("profile")));
    setLoginOpen(false);
  }, [location]);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    setClickLogout(!clickLogout);
    history.push("/home");
    setUser(null);
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to="/home">SWEET</Link>
        </Left>
        <Center open={open}>
          <Link to="/products/all" onClick={() => setOpen(false)}>
            All
          </Link>
          <Link to="/products/bakery" onClick={() => setOpen(false)}>
            Bakery
          </Link>
          <Link to="/products/beverage" onClick={() => setOpen(false)}>
            Beverage
          </Link>
          <Link to="/products/snacks" onClick={() => setOpen(false)}>
            Snacks
          </Link>
          <MobileLogin>Login</MobileLogin>
        </Center>
        <Right>
          {user ? (
            <User onClick={() => setClickLogout(!clickLogout)}>
              <span>Hi, {user.name}</span>
              <ChevronDown width={20} height={20} color="#000" stroke={2} />
              <Logout clickLogout={clickLogout} onClick={logout}>
                logout
              </Logout>
            </User>
          ) : (
            <Signin onClick={() => setLoginOpen(true)}>
              <p>Login</p>
            </Signin>
          )}
          <Link to="/wishlist">
            <Wishlist>
              <Heart width="16" height="16" color="#000" stroke="1" />
            </Wishlist>
          </Link>
          <Link to="/cart">
            <CartWrapper>
              <Cart width="16" height="16" color="#000" stroke="1" />
              <span>{qty}</span>
            </CartWrapper>
          </Link>
        </Right>
        <MobileMenuWrapper>
          <Link to="/cart">
            <CartWrapper>
              <Cart width="16" height="16" color="#000" stroke="1" />
              <span>{qty}</span>
            </CartWrapper>
          </Link>
          <Hamburger open={open} handleOpen={() => setOpen(!open)} />
        </MobileMenuWrapper>
        <ModalAuth
          loginOpen={loginOpen}
          setLoginOpen={() => setLoginOpen(false)}
        />
      </Wrapper>
    </Container>
  );
};

const Flex = css`
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  height: 54px;
  border-bottom: 1px solid ${neutral[100]};
`;

const Wrapper = styled.div`
  ${Flex}
  max-width: 90rem;
  margin: 0 auto;
  justify-content: space-between;
  font-family: semplicitapro, sans-serif;
  font-weight: 700;
  font-size: ${typeScale.helper};
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  padding: 0.75rem 1.5rem;

  @media ${breakpoint.lg} {
    padding: 0.75rem 1rem;
  }
`;

const Left = styled.div`
  flex: 1;
  font-family: "Raleway", sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
  letter-spacing: 0.25rem;
  text-transform: lowercase;
`;

const Center = styled.div`
  ${Flex}
  justify-content: space-between;
  flex: 1;

  @media ${breakpoint.lg} {
    flex-direction: column;
    justify-content: flex-start;
    position: absolute;
    top: 94px;
    left: 0;
    right: 0;
    height: calc(100vh - 4.25rem);
    background-color: #fff;
    font-size: ${typeScale.sbody};
    padding: 2rem 0;
    z-index: 1;
    transform: ${({ open }) => (open ? "scale(1)" : "scale(0)")};

    a {
      padding: 1.25rem 0;
    }

    div {
      padding: 1.25rem;

      @media ${breakpoint.lg} {
        display: block;
      }
    }
  }
`;

const MobileLogin = styled.div`
  display: none;
`;

const Right = styled.div`
  ${Flex}
  justify-content: flex-end;
  flex: 1;
  position: relative;

  .login {
    margin-right: 1rem;
  }

  @media ${breakpoint.lg} {
    display: none;
  }
`;

const Signin = styled.div`
  cursor: pointer;
`;

const User = styled.div`
  ${Flex}
  position: relative;
  cursor: pointer;
`;

const Logout = styled.div`
  display: ${(props) => (props.clickLogout ? "block" : "none")};
  position: absolute;
  top: 37px;
  left: 0;
  width: 100%;
  text-align: center;
  padding: 0.5rem 0.5rem;
  background-color: #fff;
  border-color: ${neutral[100]};
  border-style: solid;
  border-width: 0 1px 1px 1px;
  z-index: 10;
`;

const Wishlist = styled.div`
  ${Flex}
  margin: 0 1rem;
`;

const MobileMenuWrapper = styled.div`
  display: none;

  @media ${breakpoint.lg} {
    ${Flex}
    font-size: ${typeScale.helper};
  }
`;

const CartWrapper = styled.div`
  ${Flex}
  border: 1px solid ${neutral[200]};
  border-radius: 0.75rem;
  padding: 0.35rem 0.75rem;
  cursor: pointer;

  span {
    margin-left: 0.5rem;
  }
`;

export default Navbar;

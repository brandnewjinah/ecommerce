import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components";

//components
import Hamburger from "./Hamburger";
import Login from "../../../pages/auth/Login";
import Signup from "../../../pages/auth/Signup";
import Auth from "../../../pages/auth/Auth";

//token
import { neutral, primaryColor, breakpoint, typeScale } from "../../token";
import { Cart, Heart, Close, ChevronDown } from "../../../assets/Icon";

const Navbar = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [clickLogout, setClickLogout] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    // const token = user?.token;
    setUser(JSON.parse(localStorage.getItem("profile")));
    setLoginOpen(false);
  }, [location]);

  const goToSignup = () => {
    setLoginOpen(false);
    setSignupOpen(true);
  };

  const goToSignin = () => {
    setSignupOpen(false);
    setLoginOpen(true);
  };

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
          <Link to="/home">sweet</Link>
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
            <User>
              <div onClick={() => setClickLogout(!clickLogout)}>
                <span>Welcome, {user.result.name}</span>
                <ChevronDown width={20} height={20} color="#000" stroke={2} />
              </div>
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
              <span>2</span>
            </CartWrapper>
          </Link>
        </Right>
        <MobileMenuWrapper>
          <CartWrapper>
            <Cart width="16" height="16" color="#000" stroke="1" />
            <span>2</span>
          </CartWrapper>
          <Hamburger open={open} handleOpen={() => setOpen(!open)} />
        </MobileMenuWrapper>
        <Modal
          open={loginOpen}
          onClose={() => setLoginOpen(false)}
          center
          closeIcon={
            <Close width="20" height="20" color={neutral[400]} stroke="2" />
          }
        >
          {/* <Login goToSignup={goToSignup} /> */}
          <Auth goToSignup={goToSignup} />
        </Modal>
        <Modal
          open={signupOpen}
          onClose={() => setSignupOpen(false)}
          center
          closeIcon={
            <Close width="20" height="20" color={neutral[400]} stroke="2" />
          }
        >
          <Signup goToSignin={goToSignin} />
        </Modal>
      </Wrapper>
    </Container>
  );
};

const Flex = css`
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  background-color: ${primaryColor.faintBackground};
`;

const Wrapper = styled.div`
  ${Flex}
  justify-content: space-between;
  font-family: semplicitapro, sans-serif;
  font-size: ${typeScale.helper};
  font-weight: 700;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  padding: 0.75rem 1.5rem;

  @media ${breakpoint.lg} {
    padding: 0.25rem 1.5rem;
  }
`;

const Left = styled.div`
  flex: 1;
  font-family: "Cookie", cursive;
  font-size: 3.5rem;
  text-transform: lowercase;
  font-weight: 500;
  color: ${primaryColor.title};
`;

const Center = styled.div`
  ${Flex}
  justify-content: space-between;
  flex: 1;

  @media ${breakpoint.lg} {
    flex-direction: column;
    justify-content: flex-start;
    position: absolute;
    top: 4.25rem;
    left: 0;
    right: 0;
    height: calc(100vh - 4.25rem);
    background-color: ${primaryColor.faintBackground};
    font-size: ${typeScale.sbody};
    padding: 2rem 0;
    z-index: 1;
    transform: ${({ open }) => (open ? "scale(1)" : "scale(0)")};

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
  position: relative;
`;

const Logout = styled.div`
  display: ${(props) => (props.clickLogout ? "block" : "none")};
  position: absolute;
  top: 2rem;
  left: 0;
  width: 100%;
  text-align: center;
  padding: 0.5rem 0.5rem;
  background-color: #fff;
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
  border-radius: 0.875rem;
  padding: 0.5rem 0.75rem;
  cursor: pointer;

  span {
    margin-left: 0.5rem;
  }
`;

export default Navbar;

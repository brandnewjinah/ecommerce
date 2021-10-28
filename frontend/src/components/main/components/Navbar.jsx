import React, { useState } from "react";
import { Link } from "react-router-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import styled, { css } from "styled-components";

//components
import Hamburger from "./Hamburger";
import Login from "../../../pages/user/Login";
import Signup from "../../../pages/user/Signup";

//token
import { neutral, primaryColor, breakpoint, typeScale } from "../../token";
import { Cart, Close } from "../../../assets/Icon";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [modal, setModal] = useState(false);

  const goToSignup = () => {
    setLoginOpen(false);
    setSignupOpen(true);
  };

  const goToSignin = () => {
    setSignupOpen(false);
    setLoginOpen(true);
  };

  const onOpenModal = () => setModal(true);
  const onCloseModal = () => setModal(false);

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
          <Auth onClick={onOpenModal}>
            <p>Login</p>
          </Auth>
          <div>
            <Modal open={modal} onClose={onCloseModal} center>
              <Login goToSignup={goToSignup} />
            </Modal>
          </div>
          <CartWrapper>
            <Cart width="16" height="16" color="#000" stroke="1" />
            <span>2</span>
          </CartWrapper>
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
          <Login goToSignup={goToSignup} />
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

  .login {
    margin-right: 1rem;
  }

  @media ${breakpoint.lg} {
    display: none;
  }
`;

const Auth = styled.div`
  cursor: pointer;
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

import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

//import libraries
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

//import components
import Login from "../../pages/user/Login";
import Signup from "../../pages/user/Signup";

//redux
import { connect } from "react-redux";
import { logoutUser } from "../../reducers/authReducer";

//import styles and assets
import styled from "styled-components";
import colors from "../Colors";
import { Cart, Close } from "../../assets/Icons";

const Header = (props) => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [userOptions, setUserOptions] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const goToCart = () => {
    history.push("/cart");
  };

  const closeIcon = (
    <Close width="20" height="20" color={colors.gray} stroke="2" />
  );

  const goToSignup = () => {
    setLoginOpen(false);
    setSignupOpen(true);
  };

  const goToSignin = () => {
    setSignupOpen(false);
    setLoginOpen(true);
  };

  const onLogoutClick = () => {
    setUserOptions(false);
    props.logoutUser();
  };

  return (
    <Wrapper open={open}>
      <Container>
        <Logo>
          <Link to="/home">MYSHOP</Link>
        </Logo>
        <Links open={open}>
          <Left>
            <Link to="/products/all" onClick={() => setOpen(false)}>
              <p>All Products</p>
            </Link>
            <Link to="/products/bakery" onClick={() => setOpen(false)}>
              <p>Bakery</p>
            </Link>
            <Link to="/products/beverage" onClick={() => setOpen(false)}>
              <p>Beverage</p>
            </Link>
            <Link to="/products/snacks" onClick={() => setOpen(false)}>
              <p>Snacks</p>
            </Link>
            <Link to="/products/deli" onClick={() => setOpen(false)}>
              <p>Deli</p>
            </Link>
          </Left>
          <Right>
            <User>
              {props.auth.isAuthenticated ? (
                <div className="loggedin">
                  <div
                    onClick={() => setUserOptions(!userOptions)}
                    className="username"
                  >
                    Hi, {props.auth.user.name}
                  </div>
                  {userOptions && (
                    <div onClick={onLogoutClick} className="logout">
                      Logout
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div onClick={() => setSignupOpen(true)}>
                    <p>Signup</p>
                  </div>
                  <div onClick={() => setLoginOpen(true)}>
                    <p>Login</p>
                  </div>
                </>
              )}
            </User>
            <ShoppingCartWeb onClick={goToCart}>
              <Cart width="16" height="16" color="#000" stroke="1" />
              <div className="qty">{props.cart}</div>
            </ShoppingCartWeb>
          </Right>
        </Links>
        <Mobile>
          <Flex>
            <ShoppingCart onClick={goToCart}>
              <Cart width="16" height="16" color="#000" stroke="1" />
              <div className="qty">2</div>
            </ShoppingCart>
            <Burger open={open} onClick={() => setOpen(!open)}>
              <div />
            </Burger>
          </Flex>
        </Mobile>
        <Modal
          open={loginOpen}
          onClose={() => setLoginOpen(false)}
          center
          closeIcon={closeIcon}
        >
          <Login goToSignup={goToSignup} />
        </Modal>
        <Modal
          open={signupOpen}
          onClose={() => setSignupOpen(false)}
          center
          closeIcon={closeIcon}
        >
          <Signup goToSignin={goToSignin} />
        </Modal>
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

  @media (max-width: 1012px) {
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

  @media (max-width: 1012px) {
    height: 100vh;
    background-color: white;
    flex-direction: column;
    position: absolute;
    top: 3em;
    left: 0;
    right: 0;
    overflow: hidden;
    padding: 1em;
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

  @media (max-width: 1012px) {
    flex-direction: column;
    flex: 0 1 auto;
    justify-content: flex-start;

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

  @media (max-width: 1012px) {
    flex-direction: column;
    flex: 0 1 auto;
    justify-content: flex-start;

    margin-left: 0;

    div {
      margin-left: 0;
    }
  }
`;

const User = styled(Flex)`
  div {
    cursor: pointer;
  }

  .loggedin {
    flex-direction: column;
    position: relative;
  }

  .logout {
    position: absolute;
    background-color: #fff;
    padding: 0.5em 1em;
  }

  @media (max-width: 1012px) {
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
  cursor: pointer;

  .qty {
    line-height: 0.75rem;
    margin-left: 0.5em;
  }

  @media (max-width: 1012px) {
    margin-right: 1.5em;
  }
`;

const ShoppingCartWeb = styled(ShoppingCart)`
  @media (max-width: 1012px) {
    display: none;
  }
`;

const Mobile = styled.div`
  /* background-color: darkslateblue; */
  display: none;
  cursor: pointer;

  @media (max-width: 1012px) {
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

const mapStateToProps = (state) => {
  return {
    cart: state.cart.qty,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { logoutUser })(Header);

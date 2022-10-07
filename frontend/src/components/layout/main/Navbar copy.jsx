import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled, { css } from "styled-components";

//components
import Hamburger from "./Hamburger";
import { neutral, breakpoint, fontScale, size, fontSize } from "../../token";
import { Cart, Heart, ChevronDown } from "../../../assets/Icon";

//data
import { navigationItems } from "../../../data/navigationItems";

//redux
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../../redux/authRedux";
import { clearCart } from "../../../redux/cartRedux";
import { clearWishlist } from "../../../redux/wishlistRedux";
import { clearOrders } from "../../../redux/orderDetailRedux";

const Navbar = ({ open, handleOpen, handleMenu }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [clickLogout, setClickLogout] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );
  const auth = useSelector((state) => state.auth);
  const { currentUser } = auth;

  const totalQty = useSelector((state) => state.cart.totalQty);

  const handleMenuClick = () => {
    handleOpen((prev) => !prev);
  };

  const handleSignOut = () => {
    dispatch(signout());
    dispatch(clearCart());
    dispatch(clearWishlist());
    dispatch(clearOrders());
    setClickLogout(!clickLogout);
    handleOpen((prev) => !prev);
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
          <List>
            {navigationItems &&
              navigationItems.length !== 0 &&
              navigationItems.map((nav) => (
                <Item>
                  <Link to={nav.link} onClick={() => handleOpen(false)}>
                    {nav.label}
                  </Link>
                </Item>
              ))}
          </List>
          <MobileLogin>
            {currentUser ? (
              <>
                <p className="username">Hi, {currentUser.name}</p>
                <Link to="/profile">
                  <div>User Profile</div>
                </Link>
                <Link to="/history">
                  <div>Order History</div>
                </Link>
                <p className="logout" onClick={handleSignOut}>
                  Logout
                </p>
              </>
            ) : (
              <Link to="/signin" onClick={() => handleOpen(false)}>
                Login
              </Link>
            )}
          </MobileLogin>
        </Center>
        <Right>
          <UserLogin>
            {currentUser ? (
              <User onClick={() => setClickLogout(!clickLogout)}>
                <span>Hi, {currentUser.name}</span>
                <ChevronDown width={20} height={20} color="#000" stroke={2} />
                <div className="dropdown">
                  <Link to="/profile">
                    <div>User Profile</div>
                  </Link>
                  <Link to="/history">
                    <div>Order History</div>
                  </Link>
                  <div className="logout" onClick={handleSignOut}>
                    Logout
                  </div>
                </div>
              </User>
            ) : (
              <Link to="/signin">Login</Link>
            )}
          </UserLogin>
          <Link to="/wishlist">
            <IconWrapper>
              <Heart
                width="16"
                height="16"
                color="#000"
                stroke="1"
                fill="none"
              />
            </IconWrapper>
          </Link>
          <Link to="/cart">
            <CartWrapper>
              <Cart width="16" height="16" color="#000" stroke="1" />
              <span>{totalQty}</span>
            </CartWrapper>
          </Link>
          <MobileMenu>
            <Hamburger open={open} handleOpen={handleMenuClick} />
          </MobileMenu>
        </Right>
      </Wrapper>
    </Container>
  );
};

const Flex = css`
  display: flex;
  align-items: center;
`;

const Container = styled.header`
  ${Flex}
  height: 60px;
  border-bottom: 1px solid ${neutral[100]};
`;

const Wrapper = styled.div`
  ${Flex}
  justify-content: space-between;
  width: ${size.xlg};
  /* font-family: semplicitapro, sans-serif; */
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.0875rem;
  padding: 0.75rem 0;
  margin: 0 auto;

  @media ${breakpoint.xlg} {
    padding: 0.75rem 1rem;
  }
`;

const Left = styled.div`
  width: 100%;
  flex: 0 1 auto;
  justify-content: flex-start;
  font-family: "Raleway", sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 0.025rem;
  text-transform: lowercase;
`;

const Center = styled.nav`
  ${Flex}
  justify-content: center;
  width: 100%;

  @media ${breakpoint.lg} {
    flex-direction: column;
    justify-content: flex-start;
    position: fixed;
    top: 94px;
    left: 0;
    right: 0;
    bottom: 0;
    height: calc(100vh - 4.25rem);
    background-color: #fff;
    font-size: ${fontScale.scale_s4};
    z-index: 10;
    transform: ${({ open }) => (open ? "scale(1)" : "scale(0)")};
  }
`;

const List = styled.ul`
  ${Flex}
  justify-content: space-between;
  z-index: 2;

  @media ${breakpoint.lg} {
    flex-direction: column;
    flex: 0 1 auto;
    justify-content: flex-start;
    padding: 1.25rem 0;
  }
`;

const Item = styled.li`
  margin-right: ${(props) => props.end && 0};
  text-align: center;
  padding: 0 0.75rem;

  @media ${breakpoint.lg} {
    padding: 1rem 0.75rem;
  }
`;

const Right = styled.nav`
  ${Flex}
  width: 100%;
  flex: 0 1 auto;
  justify-content: flex-end;
  position: relative;

  .login {
    margin-right: 1rem;
  }
`;

const User = styled.div`
  ${Flex}
  position: relative;
  cursor: pointer;

  .dropdown {
    display: none;
    position: absolute;
    width: 200px;
    top: 20px;
    left: 50%;
    right: auto;
    transform: translate(-50%, 0);
    text-align: center;
    padding: 0.5rem 0.5rem;
    background-color: #fff;
    border-color: ${neutral[100]};
    border-style: solid;
    border-width: 0 1px 1px 1px;
    z-index: 10;

    div {
      padding: 0.5rem 0;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  &:hover .dropdown {
    display: block;
  }
`;

const IconWrapper = styled.div`
  ${Flex}
  margin: 0 1rem;
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

const UserLogin = styled.div`
  @media ${breakpoint.lg} {
    display: none;
  }
`;

const MobileLogin = styled.div`
  display: none;

  @media ${breakpoint.lg} {
    display: block;
    text-align: center;
    border-top: 1px solid ${neutral[200]};
    padding: 1.25rem 0;

    div,
    p {
      padding: 1rem 0.75rem;
    }

    .username {
      color: #e8dbce;
    }

    a {
      display: block;
    }

    .logout {
      cursor: pointer;
    }
  }
`;

const MobileMenu = styled.div`
  display: none;

  @media ${breakpoint.lg} {
    display: block;
  }
`;

export default Navbar;

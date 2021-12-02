import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled, { css } from "styled-components";

//components
import Hamburger from "./Hamburger";

//token
import { neutral, breakpoint, fontScale } from "../../token";
import { Cart, Heart, ChevronDown } from "../../../assets/Icon";

//redux
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../../redux/authRedux";
import { clearCart } from "../../../redux/cartRedux";
import { clearWishlist } from "../../../redux/wishlistRedux";
import { clearOrders } from "../../../redux/orderDetailRedux";

const Navbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  // const qty = useSelector((state) => state.cart.qty);

  const [open, setOpen] = useState(false);

  const [clickLogout, setClickLogout] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );
  const auth = useSelector((state) => state.auth);
  const { currentUser } = auth;

  const totalQty = useSelector((state) => state.cart.totalQty);

  const handleSignOut = () => {
    dispatch(signout());
    dispatch(clearCart());
    dispatch(clearWishlist());
    dispatch(clearOrders());
    setClickLogout(!clickLogout);
    setOpen(false);
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
          <MobileLogin>
            {currentUser ? (
              <>
                <div>Hi, {currentUser.name}</div>
                <Link to="/profile">
                  <div>User Profile</div>
                </Link>
                <Link to="/history">
                  <div>Order History</div>
                </Link>
                <div className="logout" onClick={handleSignOut}>
                  Logout
                </div>
              </>
            ) : (
              <Link to="/signin" onClick={() => setOpen(false)}>
                <p>Login</p>
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
                  <div
                    className="logout"
                    // clickLogout={clickLogout}
                    onClick={handleSignOut}
                  >
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
            <Hamburger open={open} handleOpen={() => setOpen(!open)} />
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
  font-size: ${fontScale.scale_s4};
  text-transform: uppercase;
  letter-spacing: 0.0875rem;
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
  letter-spacing: 0.025rem;
  text-transform: lowercase;
`;

const Center = styled.nav`
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
    font-size: ${fontScale.scale_s2};
    padding: 2rem 0;
    z-index: 10;
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

const Right = styled.nav`
  ${Flex}
  justify-content: flex-end;
  flex: 1;
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
    text-align: center;
    a {
      display: block;
      padding: 0;
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

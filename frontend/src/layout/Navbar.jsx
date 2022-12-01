import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

//comp
import { Flex } from "../components/containers/Div";
import { neutral, size, breakpoint } from "../components/token";
import { Cart, ChevronDown, Heart } from "../assets/Icon";
import NavLinks from "./components/NavLinks";
import Hamburger from "./components/Hamburger";
import UserDropdown from "./components/UserDropdown";

//redux
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../redux/authRedux";

const Navbar = ({ open, handleOpen }) => {
  const dispatch = useDispatch();
  const [userHover, setUserHover] = useState(false);
  const { currentUser, status } = useSelector((state) => state.auth);
  const totalQty = useSelector((state) => state.cartTest.totalQty);

  const handleLogOut = () => {
    dispatch(signout());
  };

  return (
    <Header>
      <Flex width={size.xl} padding="0 1rem" margin="0 auto">
        <Left>
          <Link to="/home">sweet</Link>
        </Left>
        <Center open={open}>
          <ul>
            <li onClick={() => handleOpen(false)}>
              <Link to="/category/all">All</Link>
            </li>
            <li onClick={() => handleOpen(false)}>
              <Link to="/category/new">New</Link>
            </li>
            <NavLinks handleClick={() => handleOpen(false)} />
            <li className="mobileUser" onClick={() => handleOpen(false)}>
              {status === 0 && currentUser.name === "" ? (
                <Link to="/login">Login</Link>
              ) : (
                <Link to="/profile">Hi, {currentUser.name}</Link>
              )}
            </li>
          </ul>
        </Center>
        <Right>
          <div className="userWrapper">
            {status === 0 && currentUser.name === "" ? (
              <Link to="/login">Login</Link>
            ) : (
              <div
                className="user"
                onMouseOver={() => setUserHover(true)}
                onMouseLeave={() => setUserHover(false)}
              >
                <span>Hi, {currentUser.name}</span>
                <ChevronDown width={20} height={20} color="#000" stroke={2} />
                {userHover && <UserDropdown handleLogOut={handleLogOut} />}
              </div>
            )}
          </div>
          <Link to="/wishlist">
            <div className="wishlist">
              <Heart
                width="16"
                height="16"
                color="#000"
                stroke="1"
                fill="none"
              />
            </div>
          </Link>
          <Link to="/cart">
            <div className="cartWrapper">
              <Cart width="16" height="16" color="#000" stroke="1" />
              <span>{totalQty}</span>
            </div>
          </Link>
          <div className="mobileMenu">
            <Hamburger
              open={open}
              handleOpen={() => handleOpen((prev) => !prev)}
            />
          </div>
        </Right>
      </Flex>
    </Header>
  );
};

const Header = styled.header`
  display: flex;
  align-items: center;
  position: relative;
  height: 56px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.05rem;
  text-transform: uppercase;
  text-align: center;
  border-bottom: 1px solid ${neutral[100]};
`;

const Left = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  font-family: "Raleway", sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
  letter-spacing: 0.025rem;
  text-transform: lowercase;
`;

const Center = styled.nav`
  display: flex;
  justify-content: space-around;
  flex: 3;

  ul {
    display: inline-flex;

    @media ${breakpoint.lg} {
      flex-direction: column;
    }
  }

  a {
    padding: 20px min(1vw, 16px);
    cursor: pointer;
  }

  .mobileUser {
    display: none;

    @media ${breakpoint.lg} {
      display: block;
    }
  }

  @media ${breakpoint.lg} {
    position: fixed;
    top: 91px;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    transform: ${({ open }) => (open ? "scale(1)" : "scale(0)")};
    z-index: 10;
  }
`;

const Right = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 1;

  .userWrapper {
    @media ${breakpoint.lg} {
      display: none;
    }
  }

  .user {
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
  }

  .wishlist {
    margin-left: 0.75rem;
  }

  .cartWrapper {
    display: flex;
    align-items: center;
    border: 1px solid ${neutral[200]};
    border-radius: 0.75rem;
    padding: 0.35rem 0.75rem;
    margin-left: 0.75rem;
    cursor: pointer;

    span {
      margin-left: 0.5rem;
    }
  }

  .mobileMenu {
    display: none;

    @media ${breakpoint.lg} {
      display: block;
    }
  }
`;

export default Navbar;

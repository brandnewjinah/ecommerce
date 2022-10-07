import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

//comp
import { Flex } from "../../containers/Divs";
import { Ul } from "../../containers/List";
import { neutral, size, breakpoint } from "../../token";
import { Cart, Heart } from "../../../assets/Icon";
import NavLinks from "./NavLinks";
import Hamburger from "./Hamburger";

const Navbar = ({ open, handleOpen }) => {
  return (
    <Header>
      <Flex
        justifyContent="sb"
        width={size.xlg}
        margin="0 auto"
        xlgPadding="0.75rem 1rem"
      >
        <Left>
          <Link to="/home">sweet</Link>
        </Left>
        <Center open={open}>
          <Ul>
            <li>
              <Link to="">All</Link>
            </li>
            <li>
              <Link to="">New</Link>
            </li>
            <NavLinks handleClick={() => handleOpen(false)} />
          </Ul>
        </Center>
        <Right>
          <Link to="/wishlist">
            <Heart width="16" height="16" color="#000" stroke="1" fill="none" />
          </Link>
          <Link to="/cart">
            <div className="cartWrapper">
              <Cart width="16" height="16" color="#000" stroke="1" />
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
  height: 60px;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  border-bottom: 1px solid ${neutral[100]};
`;

const Left = styled.div`
  font-family: "Raleway", sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 0.025rem;
  text-transform: lowercase;
`;

const Center = styled.nav`
  @media ${breakpoint.lg} {
    position: fixed;
    top: 100px;
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
  align-items: center;

  .cartWrapper {
    display: flex;
    align-items: center;
    border: 1px solid ${neutral[200]};
    border-radius: 0.75rem;
    padding: 0.35rem 0.75rem;
    margin-left: 0.75rem;
    cursor: pointer;
  }

  .mobileMenu {
    display: none;

    @media ${breakpoint.lg} {
      display: block;
    }
  }
`;

export default Navbar;

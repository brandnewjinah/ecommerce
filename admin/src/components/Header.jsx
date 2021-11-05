import React, { useState } from "react";
import styled, { css } from "styled-components";

//token, icon
import { Notifications, Settings } from "../assets/Icons";
import { neutral, breakpoint } from "./token";

const Header = ({ handleOpen }) => {
  const handleMenuBtnClick = () => {
    handleOpen((prev) => !prev);
  };

  return (
    <Container>
      <Wrapper>
        <Left>Sweet</Left>
        <Right>
          <MenuItems>
            <Notifications width={20} height={20} color="#e9ecef" stroke={2} />
            <Settings width={20} height={20} color="#e9ecef" stroke={2} />
            <Avatar>A</Avatar>
          </MenuItems>
          <MobileMenu onClick={handleMenuBtnClick}>menu</MobileMenu>
        </Right>
      </Wrapper>
    </Container>
  );
};

const Flex = css`
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  height: 50px;
  background-color: #fff;
  position: sticky;
  top: 0;
  border-bottom: 1px solid ${neutral[100]};
  box-shadow: 0 0.65rem 1.5rem rgb(18 38 63 / 3%);
  z-index: 100;
`;

const Wrapper = styled.div`
  ${Flex}
  justify-content: space-between;
  height: 100%;
  padding: 0px 20px;
`;

const Left = styled.div``;

const Right = styled.div``;

const Avatar = styled.div`
  ${Flex}
  justify-content: center;
  width: 30px;
  height: 30px;
  background-color: green;
  color: white;
  border-radius: 50%;
  cursor: pointer;
`;

const MenuItems = styled.div`
  display: flex;
  align-items: center;

  @media ${breakpoint.lg} {
    display: none;
  }
`;

const MobileMenu = styled.div`
  display: none;
  cursor: pointer;

  @media ${breakpoint.lg} {
    display: block;
  }
`;

export default Header;

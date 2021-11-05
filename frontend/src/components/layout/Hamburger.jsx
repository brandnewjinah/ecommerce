import React from "react";
import styled from "styled-components";

//token
import { neutral } from "../token";

const Hamburger = ({ open, handleOpen }) => {
  return (
    <HamburgerWrapper open={open} onClick={handleOpen}>
      <div />
    </HamburgerWrapper>
  );
};

const HamburgerWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 25px;
  height: 25px;
  position: relative;
  margin-left: 0.75rem;
  z-index: 1;
  cursor: pointer;

  div {
    width: 100%;
    height: 1.5px;
    background-color: ${neutral[400]};
    justify-content: center;
    transition: all 0.1s ease;
    opacity: ${({ open }) => (open ? 0 : 1)};
  }

  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 1.5px;
    background-color: ${neutral[400]};
    z-index: 1;
    transition: all 0.3s ease;
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

export default Hamburger;

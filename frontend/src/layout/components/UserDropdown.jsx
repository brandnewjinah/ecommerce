import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { neutral } from "../../components/token";

const UserDropdown = ({ handleLogOut }) => {
  return (
    <Container>
      <ul>
        <li>
          <Link to="/user">User Profile</Link>
        </li>
        <li>
          <Link to="/history">Order History</Link>
        </li>
        <li onClick={handleLogOut}>Logout</li>
      </ul>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  background-color: #fff;
  border: none;
  width: 160px;
  top: 20px;
  left: 50%;
  right: auto;
  transform: translate(-50%, 0);
  text-align: center;
  box-shadow: rgba(255, 255, 255, 0.15) 0px 4px 12px;
  padding: 0.5rem 0.5rem;
  z-index: 10;

  li {
    padding: 0.5rem 0;
  }
`;

export default UserDropdown;

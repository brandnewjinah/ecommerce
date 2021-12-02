import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { fontScale } from "../../token";

const menuItems = [
  {
    name: "Account",
    url: "/profile",
  },
  {
    name: "Order History",
    url: "/history",
  },
];

const Side = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <Container>
      <Nav>
        {menuItems.map((item, idx) => (
          <List url={item.url} pathname={pathname} key={idx}>
            <Link to={item.url}>{item.name}</Link>
          </List>
        ))}
      </Nav>
    </Container>
  );
};

const Container = styled.nav`
  flex: 1;
`;

const Nav = styled.ul`
  font-size: ${fontScale.scale_s2};
`;

const List = styled.li`
  font-weight: ${(props) => props.url === props.pathname && 700};
  padding: 0.5rem 0;
`;

export default Side;

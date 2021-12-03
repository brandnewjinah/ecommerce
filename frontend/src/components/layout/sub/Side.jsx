import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { breakpoint, fontScale, primaryColor } from "../../token";

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

  @media ${breakpoint.lg} {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
`;

const List = styled.li`
  padding: 0.5rem 0;
  a {
    font-weight: ${(props) => props.url === props.pathname && 700};
  }

  @media ${breakpoint.lg} {
    a {
      font-weight: 400;
      border-bottom: 2px solid
        ${(props) =>
          props.url === props.pathname ? primaryColor.blue : "transparent"};
    }
  }
`;

export default Side;

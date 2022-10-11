import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { neutral, breakpoint, fontSize } from "./token";

const Breadcrumbs = ({ item1, item2 }) => {
  return (
    <Container>
      <Link to={`/products/${item1 && item1.value}`}>
        {item1 && item1.value}
      </Link>
      <span className="divider" aria-hidden="true">
        /
      </span>
      <span>{item2 && item2.value}</span>
    </Container>
  );
};

const Container = styled.nav`
  font-size: ${fontSize.sm4};
  color: ${neutral[400]};
  text-transform: capitalize;
  padding: 0.5rem 0;

  a {
    &:hover {
      text-decoration: underline;
    }
  }

  .divider {
    padding: 0 0.35rem;
  }

  @media ${breakpoint.lg} {
    padding: 1rem;
  }
`;

export default Breadcrumbs;

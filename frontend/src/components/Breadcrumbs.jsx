import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { neutral, typeScale } from "./token";

const Breadcrumbs = ({ item1, item2 }) => {
  console.log(item1);
  return (
    <Container>
      <Link to={`/products/${item1 && item1.value}`}>
        <span>{item1 && item1.value}</span>
      </Link>
      <span className="divider">/</span>
      <span>{item2 && item2.value}</span>
    </Container>
  );
};

const Container = styled.div`
  font-size: ${typeScale.helper};
  color: ${neutral[400]};
  padding: 0.5rem 0;

  span {
    text-transform: capitalize;
  }

  a {
    color: ${neutral[500]};
    text-decoration: underline;
  }

  .divider {
    padding: 0 0.35rem;
  }
`;

export default Breadcrumbs;

import React, { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

//comp
import { neutral, breakpoint, fontSize } from "./token";

//interfaces
import { CategoryIF, SubcategoryIF } from "./../interfaces/categoryInterface";

interface Props {
  category1: CategoryIF;
  category2?: SubcategoryIF;
}

const Breadcrumbs: FC<Props> = ({ category1, category2 }) => {
  return (
    <Container>
      <Link to={`/category/${category1 && category1.value}`}>
        {category1 && category1.value}
      </Link>
      <span className="divider" aria-hidden="true">
        /
      </span>
      <span>{category2 && category2.value}</span>
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

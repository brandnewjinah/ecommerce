import React, { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

//comp
import { neutral, breakpoint, fontSize } from "./token";

interface CategoryIF {
  title: string;
  link: string;
}

interface Props {
  category1?: CategoryIF;
  category2?: string;
}

const Breadcrumbs: FC<Props> = ({ category1, category2 }) => {
  return (
    <Container>
      <a href={`${category1 && category1.link}`}>
        {category1 && category1.title}
      </a>
      <span className="divider" aria-hidden="true">
        /
      </span>
      <span>{category2 && category2}</span>
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

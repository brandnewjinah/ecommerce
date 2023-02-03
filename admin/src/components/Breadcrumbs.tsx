import React, { FC } from "react";
import styled from "styled-components";

//comp
import { neutral, breakpoint, fontSize } from "./token";

interface CategoryIF {
  title: string | null;
  link?: string | null;
}

interface Props {
  category1?: CategoryIF;
  category2?: CategoryIF;
  category3?: CategoryIF;
}

const Breadcrumbs: FC<Props> = ({ category1, category2, category3 }) => {
  return (
    <Container>
      {category1 && category1.link ? (
        <a href={`${category1 && category1.link}`}>{category1.title}</a>
      ) : (
        <span>{category1!.title}</span>
      )}
      <span className="divider" aria-hidden="true">
        /
      </span>
      {category2 && category2.link ? (
        <a href={`${category2 && category2.link}`}>{category2.title}</a>
      ) : (
        <span>{category2!.title}</span>
      )}
      {category3 && category3!.title !== null && (
        <>
          <span className="divider" aria-hidden="true">
            /
          </span>
          <span>{category3.title}</span>
        </>
      )}
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

  span:last-child {
    color: ${neutral[600]};
  }

  @media ${breakpoint.lg} {
    padding: 1rem;
  }
`;

export default Breadcrumbs;

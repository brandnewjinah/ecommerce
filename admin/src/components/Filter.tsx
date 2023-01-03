import React, { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

//token
import { neutral, breakpoint, fontSize } from "./token";

interface Props {
  data: string[];
  category?: string;
  className?: string;
}

const Filter: FC<Props> = ({ data, category, className }) => {
  let active: string = category!;

  return (
    <Container className={className}>
      {data &&
        data.map((item, idx) => (
          <Link to={`/products/list/${item}`} key={idx}>
            <List>
              <div>
                <span className={item === active ? "active" : ""}>{item}</span>
              </div>
            </List>
          </Link>
        ))}
    </Container>
  );
};

const Container = styled.ul`
  display: flex;

  .active {
    position: relative;
    cursor: pointer;
    white-space: nowrap;

    &:after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      border-bottom: 1px solid ${neutral[400]};
    }
  }

  @media ${breakpoint.m} {
    padding: 0.5rem 0 1rem;
  }
`;

const List = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${fontSize.sm2};
  color: ${neutral[600]};
  padding: 0.5rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export default Filter;

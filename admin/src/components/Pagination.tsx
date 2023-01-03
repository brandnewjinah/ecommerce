import React, { FC } from "react";
import _ from "lodash";
import styled from "styled-components";

//comp
import { neutral, fontSize } from "./token";

interface Props {
  pageCount: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
}

const Pagination: FC<Props> = ({
  pageCount,
  currentPage,
  handlePageChange,
}) => {
  // const pageCount = count / limit;
  const pages = _.range(1, pageCount + 1);

  return (
    <Container>
      <ul>
        {pages.map((page) => (
          <li
            className={page === currentPage ? "active" : null!}
            key={page}
            onClick={() => handlePageChange(page)}
          >
            <span>{page}</span>
          </li>
        ))}
      </ul>
    </Container>
  );
};

const Container = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.5rem 0;

  ul {
    display: flex;
  }

  li {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${fontSize.sm2};
    padding: 0.25rem;
    margin: 0 0.5rem;
    cursor: pointer;

    &:hover {
      background-color: ${neutral[10]};
    }
  }

  .active {
    background-color: ${neutral[200]};

    &:hover {
      background-color: ${neutral[200]};
    }
  }
`;

export default Pagination;

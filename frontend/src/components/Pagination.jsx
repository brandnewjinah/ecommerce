import React from "react";
import _ from "lodash";

//import styles and assets
import styled from "styled-components";
import { neutral, typeScale } from "./token";

const Pagination = ({ pageCount, currentPage, handlePageChange }) => {
  // const pageCount = count / limit;
  const pages = _.range(1, pageCount + 1);

  return (
    <Container>
      <ul>
        {pages.map((page) => (
          <li
            className={page === currentPage ? "active" : null}
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
  padding: 1.5rem 0;

  ul {
    display: flex;
  }

  li {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${typeScale.sbody};
    padding: 0.25rem;
    margin: 0 0.5rem;
    cursor: pointer;
  }

  .active {
    background-color: ${neutral[200]};
  }
`;

export default Pagination;

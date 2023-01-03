import React, { FC } from "react";

//import libraries
import styled from "styled-components";
import _ from "lodash";

//import assets
import { neutral } from "./token";
import { ChevronLeft, ChevronRight } from "../assets/Icon";

interface Props {
  dataLength: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  handleNext: () => void;
  handlePrev: () => void;
}

const Pagination: FC<Props> = ({
  dataLength,
  pageSize,
  currentPage,
  handleNext,
  handlePrev,
  onPageChange,
}) => {
  const numberOfPages = Math.ceil(dataLength / pageSize);
  if (numberOfPages === 1) return null; //if there's only 1 page, do not show pagination
  const pages = _.range(1, numberOfPages + 1); //creates an array with numbers [1, 2, 3... number of pages]

  return (
    <Nav aria-label="pagination">
      <ul>
        <Arrow>
          <a aria-label="Go to previous page" onClick={() => handlePrev()}>
            <ChevronLeft width={20} height={20} color="#000" stroke={2} />
          </a>
        </Arrow>
        {pages.map((page) => (
          <li key={page}>
            {page === currentPage ? (
              <a
                className="pageLink active"
                aria-label={`page ${page}`}
                aria-current={true}
                onClick={() => onPageChange(page)}
              >
                {page}
              </a>
            ) : (
              <a
                className="pageLink"
                aria-label={`page ${page}`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </a>
            )}
          </li>
        ))}
        <Arrow>
          <a aria-label="Go to next page" onClick={() => handleNext()}>
            <ChevronRight width={20} height={20} color="#000" stroke={2} />
          </a>
        </Arrow>
      </ul>
    </Nav>
  );
};

const Nav = styled.nav`
  font-weight: 600;

  ul {
    list-style-type: none;
    text-indent: 0;
    padding-left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1em 0;
  }

  .pageLink {
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.25rem;
    margin: 0 0.5rem;
    cursor: pointer;

    &:hover {
      background-color: ${neutral[100]};
      border-radius: 50%;
    }
  }

  .active {
    background-color: ${neutral[100]};
    border-radius: 50%;
  }
`;

const Arrow = styled.li`
  margin: 0 0.5rem;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default Pagination;

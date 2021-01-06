import React from "react";
import _ from "lodash";

//import styles and assets
import styled from "styled-components";
import colors from "./Colors";

const Pagination = ({ count, limit, currentPage, handlePageChange }) => {
  const pageCount = count / limit;
  const pages = _.range(1, pageCount + 1);

  return (
    <Wrapper>
      <Container>
        <ul className="pagination">
          {pages.map((page) => (
            <li className={page === currentPage ? "active" : null} key={page}>
              <div className="link" onClick={() => handlePageChange(page)}>
                {page}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 1em 0;
`;

const Container = styled.nav`
  padding: 1em 0;

  ul {
    display: flex;
  }

  li {
    width: 30px;
    height: 30px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.25em;
    margin: 0 0.5em;
    cursor: pointer;
  }

  .active {
    background-color: ${colors.lightgray};
  }
`;

export default Pagination;

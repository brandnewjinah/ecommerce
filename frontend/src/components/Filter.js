import React from "react";

//import components

//import styles and assets
import styled from "styled-components";
import colors from "./Colors";

const Filter = ({ category, handleCatChange }) => {
  return (
    <Wrapper>
      <Container>
        <ul className="pagination">
          <li onClick={() => handleCatChange(category.id)}>All</li>
          {category &&
            category.subcategory.map((s, idx) => (
              <li key={idx}>
                <div className="link" onClick={() => handleCatChange(s.id)}>
                  {s.label}
                </div>
              </li>
            ))}
        </ul>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Container = styled.nav`
  padding: 1em 0;

  ul {
    display: flex;
  }

  li {
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

export default Filter;

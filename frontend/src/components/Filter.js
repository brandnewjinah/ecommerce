import React, { useState, useEffect } from "react";

//import data
import { catData } from "../data/category";

//import styles and assets
import styled from "styled-components";
import colors from "./Colors";

const Filter = ({ category, handleCatChange }) => {
  const [result, setResult] = useState();

  useEffect(() => {
    const findCategory = () => {
      const result = catData.find((c) => c.value === category);
      setResult(result);
    };

    findCategory();
  }, [category]);

  return (
    <Wrapper>
      <Container>
        <ul className="pagination">
          <li onClick={() => handleCatChange()}>All</li>
          {category === "all"
            ? catData.map((c, idx) => (
                <li key={idx}>
                  <div className="link" onClick={() => handleCatChange(c.id)}>
                    {c.label}
                  </div>
                </li>
              ))
            : result &&
              result.subcategory.map((c, idx) => (
                <li key={idx}>
                  <div className="link" onClick={() => handleCatChange(c.id)}>
                    {c.label}
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
    font-size: 0.875rem;
    color: ${colors.darkestgray};
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

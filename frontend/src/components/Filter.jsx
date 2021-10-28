import React, { useState, useEffect } from "react";
import styled from "styled-components";

//import data
import { categoryList } from "../data/category";

//token
import { neutral, primaryColor } from "./token";

const Filter = ({ category, handleCatChange }) => {
  const [currentCategory, setCurrentCategory] = useState();
  const [active, setActive] = useState();

  useEffect(() => {
    const findCategory = () => {
      const result = categoryList.find((c) => c.value === category);
      setCurrentCategory(result);
    };

    findCategory();
  }, [category]);

  const handleSelect = (id) => {
    handleCatChange(id);
    setActive(id);
  };

  return (
    <Wrapper>
      <ul className="pagination">
        {category === "all" ? null : (
          <>
            <li onClick={() => handleSelect("all")}>
              <span className={active === "all" ? "active" : ""}>All</span>
            </li>
            {currentCategory &&
              currentCategory.subcategory.map((c, idx) => (
                <li key={idx}>
                  <div className="link" onClick={() => handleSelect(c.id)}>
                    <span className={c.id === active ? "active" : ""}>
                      {c.label}
                    </span>
                  </div>
                </li>
              ))}
          </>
        )}
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  padding: 1em 0;

  ul {
    display: flex;
  }

  li {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.875rem;
    color: ${neutral[500]};
    padding: 0.25rem 0.5rem;
    cursor: pointer;
  }

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
`;

export default Filter;

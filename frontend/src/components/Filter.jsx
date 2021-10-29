import React, { useState, useEffect } from "react";
import styled from "styled-components";

//import data
import { categoryList } from "../data/category";

//token
import { neutral, typeScale } from "./token";

const Filter = ({ category, handleFilter }) => {
  const [subCategories, setSubCategories] = useState();
  const [active, setActive] = useState();

  useEffect(() => {
    const findCategory = () => {
      const result =
        category !== "all" &&
        categoryList.find((item) => item.value === category);
      setSubCategories(result.subcategory);
    };

    findCategory();
  }, [category]);

  const handleSelect = (id) => {
    handleFilter(id);
    setActive(id);
  };

  return (
    <Container>
      {category === "all" ? null : (
        <>
          <List onClick={() => handleSelect("all")}>
            <span className={active === "all" ? "active" : ""}>All</span>
          </List>
          {subCategories &&
            subCategories.map((item, idx) => (
              <List key={idx}>
                <Item className="link" onClick={() => handleSelect(item.value)}>
                  <span className={item.id === active ? "active" : ""}>
                    {item.label}
                  </span>
                </Item>
              </List>
            ))}
        </>
      )}
    </Container>
  );
};

const Container = styled.ul`
  padding: 1em 0;
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
`;

const List = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${typeScale.sbody};
  color: ${neutral[500]};
  padding: 0.25rem 0.5rem;
  cursor: pointer;
`;

const Item = styled.div``;

export default Filter;

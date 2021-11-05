import React, { useState, useEffect } from "react";
import styled from "styled-components";

//import data
import { categoryList } from "../data/category";

//token
import { neutral, typeScale } from "./token";

const Filter = ({ category, handleFilter }) => {
  const [subCategories, setSubCategories] = useState([]);
  const [active, setActive] = useState();

  useEffect(() => {
    const findCategory = () => {
      const result =
        category === "bakery" ||
        category === "beverage" ||
        category === "snacks"
          ? categoryList.find((item) => item.value === category)
          : [];
      setSubCategories(result.subcategory);
    };

    findCategory();
  }, [category]);

  const handleSelect = (id) => {
    handleFilter(id);
    setActive(id);
  };

  console.log(subCategories);
  return (
    <Container>
      {category === "bakery" ||
      category === "beverage" ||
      category === "snacks" ? (
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
      ) : null}
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
`;

const List = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${typeScale.sbody};
  color: ${neutral[500]};
  padding: 0.25rem 0.5rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Item = styled.div``;

export default Filter;

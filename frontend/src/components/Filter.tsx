import React, { FC, useState, useEffect } from "react";
import styled from "styled-components";

//import data
import { categoryList } from "../data/category";

//interface
import { CategoryIF, SubcategoryIF } from "../interfaces/categoryInterface";

//token
import { neutral, breakpoint, fontSize } from "./token";

interface Props {
  category: string;
  handleFilter: (value: string) => void;
}

const Filter: FC<Props> = ({ category, handleFilter }) => {
  const [subCategories, setSubCategories] = useState<SubcategoryIF[]>([]);
  const [active, setActive] = useState<string>();

  useEffect(() => {
    const findCategory = () => {
      const result: CategoryIF = categoryList.find(
        (item) => item.value === category
      )!;
      result && result !== undefined
        ? setSubCategories(result.subcategory!)
        : setSubCategories([]);
    };

    findCategory();
  }, [category]);

  const handleSelect = (value: string) => {
    handleFilter(value);
    setActive(value);
  };

  return (
    <Container>
      {category === "all" || category === "new" ? null : (
        <>
          <List onClick={() => handleSelect("all")}>
            <span className={active === "all" ? "active" : ""}>All</span>
          </List>
          {subCategories &&
            subCategories.map((item, idx) => (
              <List key={idx}>
                <div onClick={() => handleSelect(item.value)}>
                  <span className={item.value === active ? "active" : ""}>
                    {item.label}
                  </span>
                </div>
              </List>
            ))}
        </>
      )}
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
  background-color: ${neutral[100]};
  border-radius: 2rem;
  font-size: ${fontSize.sm2};
  color: ${neutral[600]};
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export default Filter;

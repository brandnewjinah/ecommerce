import React, { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

//import data
import { categoryList } from "../data/category";

//interface
import { CategoryIF, SubcategoryIF } from "../interfaces/categoryInterface";

//token
import { neutral, breakpoint, fontSize } from "./token";

interface Props {
  category: string;
  sub?: string;
}

const Filter: FC<Props> = ({ category, sub }) => {
  const [subCategories, setSubCategories] = useState<SubcategoryIF[]>([]);
  let active: string = sub!;

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

  return (
    <Container>
      {category === "all" || category === "new" ? null : (
        <>
          <Link to={`/category/${category}`}>
            <List>
              <span className={active === undefined ? "active" : ""}>All</span>
            </List>
          </Link>
          {subCategories &&
            subCategories.map((item, idx) => (
              //link to subcategory
              <Link to={`/category/${category}/${item.id}`} key={idx}>
                <List>
                  <div>
                    <span
                      className={item.id === parseInt(active) ? "active" : ""}
                    >
                      {item.label}
                    </span>
                  </div>
                </List>
              </Link>
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

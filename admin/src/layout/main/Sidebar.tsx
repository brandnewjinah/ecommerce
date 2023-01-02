import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

//comp
import {
  ChevronRight,
  Home,
  Products,
  Orders,
  Customers,
  Subscribers,
} from "../../assets/Icon";
import { Flex } from "../../components/containers/Div";
import { neutral, breakpoint } from "../../components/token";

// data
import { navData } from "../../data/navData";

interface Props {
  sideOpen?: boolean;
  handleOpen?: any;
  name?: string;
  width?: number;
  height?: number;
  stroke?: number;
  color?: string;
}

const MenuIcons: FC<Props> = ({ name, width, height, stroke, color }) => {
  return (
    <>
      {name === "Dashboard" ? (
        <Home width={width!} height={height!} color={color} stroke={stroke} />
      ) : name === "Products" ? (
        <Products
          width={width!}
          height={height!}
          color={color}
          stroke={stroke}
        />
      ) : name === "Orders" ? (
        <Orders width={width!} height={height!} color={color} stroke={stroke} />
      ) : name === "Customers" ? (
        <Customers
          width={width!}
          height={height!}
          color={color}
          stroke={stroke}
        />
      ) : name === "Subscribers" ? (
        <Subscribers
          width={width!}
          height={height!}
          color={color}
          stroke={stroke}
        />
      ) : null}
    </>
  );
};

const Sidebar: FC<Props> = ({ sideOpen, handleOpen }) => {
  const [open, setOpen] = useState(1000);
  const [active, setActive] = useState("");

  const handleSubcategory = (sub: string) => {
    setActive(sub);
    handleOpen((prev: boolean) => !prev);
  };

  return (
    <Container sideOpen={sideOpen}>
      <NavList>
        {navData.map((category, idx) => (
          <li key={idx}>
            <CategoryALink
              aria-haspopup="true"
              aria-expanded={idx === open ? true : false}
              onClick={() => setOpen(idx === open ? 1000 : idx)}
              href={category.link && `${category.link}`}
            >
              <Flex gap=".75rem">
                <MenuIcons
                  name={category.name}
                  width={16}
                  height={16}
                  color="#74788d"
                  stroke={1.875}
                />
                <span>{category.name}</span>
              </Flex>
              {category.subcategory && (
                <span className={idx === open ? "arrow" : "arrowBack"}>
                  <ChevronRight
                    width={16}
                    height={16}
                    color="#000"
                    stroke={1}
                  />
                </span>
              )}
            </CategoryALink>
            {category.subcategory && (
              <ul className={idx === open ? "" : "hide"}>
                {category.subcategory.map((sub, idx) => (
                  <SubCategoryListItem key={idx}>
                    <Link
                      to={sub.link}
                      onClick={() => handleSubcategory(sub.name)}
                      className={sub.name === active ? "active" : ""}
                    >
                      {sub.name}
                    </Link>
                  </SubCategoryListItem>
                ))}
              </ul>
            )}
          </li>
        ))}
      </NavList>
    </Container>
  );
};

const Container = styled.nav<Props>`
  position: static;
  width: 250px;
  font-size: 0.8125rem;
  color: ${neutral[500]};
  padding-top: 2rem;

  .hide {
    display: none;
  }

  @media ${breakpoint.lg} {
    display: ${(props) => (props.sideOpen ? "block" : "none")};
    min-height: 0px;
    max-height: 100%;
  }
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const CategoryALink = styled.a`
  width: 100%;
  padding: 0.875rem 1.25rem;
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
    border-radius: 0.35em;
  }

  .arrow {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transform: rotate(90deg);
    transition: transform 0.15s linear;
  }

  .arrowBack {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.15s linear;
  }
`;

const SubCategoryListItem = styled.li`
  a {
    width: 100%;
    padding: 0.875rem 1.25rem 0.875rem 3rem;

    &:hover {
      background-color: rgba(0, 0, 0, 0.04);
      border-radius: 0.35em;
    }
  }

  .active {
    background-color: rgba(0, 0, 0, 0.04);
    border-radius: 0.35em;
  }
`;

export default Sidebar;

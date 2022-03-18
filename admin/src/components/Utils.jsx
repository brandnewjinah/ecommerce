import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

//icons
import {
  Home,
  Customers,
  Products,
  Orders,
  ChevronRight,
  Grid,
} from "../assets/Icons";

//token
import { blue } from "./token";

export const MenuItems = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Products",
    submenu: [
      {
        name: "All Products",
        link: "/products",
      },
      {
        name: "Add Product",
        link: "/addproduct",
      },
    ],
  },
  {
    name: "Orders",
    link: "/orders",
  },
  {
    name: "Customers",
    link: "/customers",
  },
];

const MenuIcons = ({ name, width, height, stroke, color }) => {
  return (
    <>
      {name === "Home" ? (
        <Home width={width} height={height} color={color} stroke={stroke} />
      ) : name === "Products" ? (
        <Products width={width} height={height} color={color} stroke={stroke} />
      ) : name === "Orders" ? (
        <Orders width={width} height={height} color={color} stroke={stroke} />
      ) : name === "Customers" ? (
        <Customers
          width={width}
          height={height}
          color={color}
          stroke={stroke}
        />
      ) : name === "Manage" ? (
        <Grid width={width} height={height} color={color} stroke={stroke} />
      ) : null}
    </>
  );
};

export const MenuItem = ({
  subSelected,
  name,
  link,
  menuSelected,
  submenu,
  handleSelected,
  handleSubClick,
}) => {
  return (
    <List>
      <div
        className={
          name === menuSelected && name === subSelected
            ? "list active"
            : "list "
        }
        onClick={handleSelected}
      >
        <Link to={!submenu ? `${link}` : ""}>
          <div className="flexAignCenter">
            <MenuIcons
              name={name}
              width="16"
              height="16"
              color="#74788d"
              stroke="2"
            />
            <span className="menuTitle">{name}</span>
          </div>
        </Link>
        {submenu && (
          <div
            className={
              name === menuSelected
                ? "transform transformActive flexCenter"
                : "transform flexCenter"
            }
          >
            <ChevronRight width="16" height="16" color="#74788d" stroke="2" />
          </div>
        )}
      </div>
      {submenu && (
        <ul className={name === menuSelected ? "" : "hide"}>
          {submenu.map((item, idx) => (
            <List
              key={idx}
              className={
                item.name === subSelected ? "subList active" : "subList"
              }
              onClick={() => handleSubClick(item.name)}
            >
              <Link to={`${item.link}`}>
                <span>{item.name}</span>
              </Link>
            </List>
          ))}
        </ul>
      )}
    </List>
  );
};

const List = styled.li`
  font-size: 0.875rem;
  font-weight: 600;
  color: #74788d;
  cursor: pointer;

  a {
    width: 100%;
  }

  svg {
    display: block;
  }

  .list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.625rem 1.5rem;
  }

  .flexAignCenter {
    display: flex;
    align-items: center;
  }

  .active {
    /* background-color: #f3f3f3; */
    background-color: ${blue[100]};
  }

  .transform {
    transform-origin: center;
    transform: rotate(0);
    transition: all 0.3s;
  }

  .transformActive {
    transform: rotate(90deg);
  }

  .hide {
    height: 0;
    overflow: hidden;
  }

  .menuTitle {
    padding-left: 0.5rem;
  }

  .subList {
    padding: 0.4rem 3rem;
  }

  .flexCenter {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

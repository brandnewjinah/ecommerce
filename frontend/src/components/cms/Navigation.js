import React, { useState } from "react";
import { Link } from "react-router-dom";

//import styles and assets
import styled from "styled-components";
import { ChevronDown } from "../../assets/Icons";
import { MenuIcon } from "../../assets/MenuIcon";
import colors from "../Colors";

const data = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Products",
    subcategory: [
      {
        name: "Products",
        link: "/products",
      },
      {
        name: "Add a Product",
        link: "/products/add",
      },
    ],
  },
  {
    name: "Orders",
    subcategory: [
      {
        name: "New",
        link: "/orders",
      },
      {
        name: "Completed",
        link: "",
      },
    ],
  },
  {
    name: "Users",
    subcategory: [
      {
        name: "New",
        link: "/users",
      },
      {
        name: "All",
        link: "/users",
      },
    ],
  },
];

const Navigation = () => {
  const [open, setOpen] = useState();
  const [active, setActive] = useState();

  const handleCurrent = (idx, name) => {
    setOpen(idx === open ? null : idx);
    setActive(name);
  };

  return (
    <Wrapper>
      <ul>
        {data.map((cat, idx) => (
          <div key={idx}>
            {!cat.subcategory ? (
              <li
                className={cat.name === active ? "title active" : "title"}
                onClick={() => handleCurrent(idx, cat.name)}
              >
                <Link to={`/cms${cat.link}`}>
                  <MenuIcon
                    name={cat.name}
                    width="14"
                    height="14"
                    color={idx === open ? "#fff" : colors.darkgray}
                    stroke="2"
                  />
                  <div className="label">{cat.name}</div>
                </Link>
              </li>
            ) : (
              <li>
                <div
                  className={
                    cat.name === active
                      ? `title flexspace activeTitle`
                      : `title flexspace`
                  }
                  onClick={() => setOpen(idx === open ? null : idx)}
                >
                  <div className="flex">
                    <MenuIcon
                      name={cat.name}
                      width="14"
                      height="14"
                      color={idx === open ? "#fff" : colors.darkgray}
                      stroke="2"
                    />
                    <div
                      className="label"
                      style={{ color: idx === open ? "#fff" : colors.darkgray }}
                    >
                      {cat.name}
                    </div>
                  </div>
                  <IconContainer
                    style={
                      idx === open
                        ? { transform: `rotate(180deg)` }
                        : { transform: `rotate(0deg)` }
                    }
                  >
                    <ChevronDown
                      width="14"
                      height="14"
                      color="#000"
                      stroke="2"
                    />
                  </IconContainer>
                </div>
                <ul className={idx === open ? "" : "hide"}>
                  {cat.subcategory.map((sub, idx) => (
                    <li
                      key={idx}
                      className={sub.name === active ? "title active" : "title"}
                      onClick={() => setActive(sub.name)}
                    >
                      <Link to={`/cms${sub.link}`}>
                        <div style={{ paddingLeft: `1.75em` }}>{sub.name}</div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            )}
          </div>
        ))}
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  position: fixed;
  width: 250px;
  min-height: 100vh;
  color: ${colors.darkgray};
  font-size: 0.875rem;
  font-weight: 500;
  background-color: #030f25;
  box-shadow: 1em 0 1em -1em rgba(18, 38, 63, 0.03);
  z-index: 10;
  padding-top: 5em;

  li {
    cursor: pointer;
  }

  a {
    display: flex;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: ${colors.lightergray};
    }
  }

  .title {
    padding: 0.75em 1.5em;
  }

  .label {
    margin-left: 10px;
  }

  .flex {
    display: flex;
    align-items: center;
  }

  .flexspace {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .hide {
    height: 0;
    overflow: hidden;
  }

  .activeTitle {
    color: ${colors.faintgray};
  }

  .active {
    background-color: #06193b;
    color: ${colors.faintgray};
  }
`;

const IconContainer = styled.div`
  transform-origin: center;
  transition: all 0.3s;
`;

export default Navigation;

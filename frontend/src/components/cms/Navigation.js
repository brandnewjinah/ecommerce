import React, { useState } from "react";
import { Link } from "react-router-dom";

//import styles and assets
import styled from "styled-components";
import { ChevronDown } from "../../assets/Icons";
import { MenuIcon } from "../../assets/MenuIcon";

const data = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Products",
    subcategory: [
      {
        name: "Inventory",
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
        link: "",
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
                    color={idx === open ? "#46a8d4" : "#444"}
                    stroke="2"
                  />
                  <div style={{ marginLeft: `10px` }}>{cat.name}</div>
                </Link>
              </li>
            ) : (
              <li>
                <div
                  className="title flexspace"
                  onClick={() => setOpen(idx === open ? null : idx)}
                >
                  <div className="flex">
                    <MenuIcon
                      name={cat.name}
                      width="14"
                      height="14"
                      color={idx === open ? "#46a8d4" : "#444"}
                      stroke="2"
                    />
                    <div style={{ marginLeft: `10px` }}>{cat.name}</div>
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
  background-color: #fff;
  position: fixed;
  height: calc(100vh - 70px);
  width: 250px;
  padding-top: 2em;
  z-index: 10;
  box-shadow: 1em 0 1em -1em rgba(18, 38, 63, 0.03);

  li {
    cursor: pointer;
  }

  a {
    display: flex;
  }

  .title {
    padding: 0.75em 1.5em;
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

  .active {
    background-color: #f4f4f4;
  }
`;

const IconContainer = styled.div`
  transform-origin: center;
  transition: all 0.3s;
`;

export default Navigation;

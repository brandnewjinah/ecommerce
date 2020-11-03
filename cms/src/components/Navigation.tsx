import React, { FC, useState } from "react";
import { Link } from "react-router-dom";

//import styles and assets
import styled from "styled-components";

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
        link: "",
      },
      {
        name: "Add a Product",
        link: "/addproduct",
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
        link: "",
      },
      {
        name: "All",
        link: "",
      },
    ],
  },
];

interface Props {}

const Navigation: FC<Props> = () => {
  const [current, setCurrent] = useState<any>(null);

  return (
    <Wrapper>
      {data.map((cat, idx) => (
        <Category>
          <div
            className="title"
            onClick={() => setCurrent(idx === current ? null : idx)}
          >
            {cat.link ? (
              <Link to={cat.link}>{cat.name}</Link>
            ) : (
              <div>{cat.name}</div>
            )}
          </div>

          <div className={current === idx ? "show" : "hide"}>
            {cat.subcategory &&
              cat.subcategory.map((sub, idx) => (
                <Sub>
                  <Link to={sub.link}>
                    <div>{sub.name}</div>
                  </Link>
                </Sub>
              ))}
          </div>
        </Category>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: aliceblue;
  display: flex;
  flex-direction: column;
`;

const Category = styled.div`
  margin: 0 2em;

  .title {
    background-color: mistyrose;
  }

  .show {
    max-height: 100%;
    transition: all 0.3s ease;
  }

  .hide {
    height: 0;
    overflow: hidden;
    transition: all 0.3s ease;
  }
`;

const Sub = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Navigation;

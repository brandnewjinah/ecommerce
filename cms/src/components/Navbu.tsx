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
        link: "/products",
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
  const [active, setActive] = useState<any>(null);

  const handleCurrent = (idx: any) => {
    setCurrent(idx === current ? null : idx);
    setActive(idx);
  };

  return (
    <Wrapper>
      {data.map((cat, idx) => (
        <div key={idx}>
          {!cat.subcategory ? (
            <div
              className={idx === active ? "active" : "category"}
              onClick={() => handleCurrent(idx)}
            >
              <Link to={cat.link}>
                <div className="title">{cat.name}</div>
              </Link>
            </div>
          ) : (
            <div>
              <div
                className={idx === active ? "active" : "category"}
                onClick={() => setCurrent(idx === current ? null : idx)}
              >
                <div className="title">{cat.name}</div>
              </div>
              <div className={current === idx ? "show" : "hide"}>
                {cat.subcategory &&
                  cat.subcategory.map((sub, idx) => (
                    <Sub
                      key={idx}
                      className={sub.name === active ? "active" : "category"}
                      onClick={() => setActive(sub.name)}
                    >
                      <Link to={sub.link}>
                        <div>{sub.name}</div>
                      </Link>
                    </Sub>
                  ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background-color: #fff;
  width: 250px;
  position: fixed;
  height: calc(100vh - 70px);
  margin-top: 70px;
  padding-top: 2em;
  z-index: 10;
  box-shadow: 1em 0 1em -1em rgba(18, 38, 63, 0.03);

  .category {
  }

  .active {
    background-color: mistyrose;
  }

  .title {
    padding: 0.75em 2em;
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
  padding: 0.75em 0 0.75em 2.75em;
`;

export default Navigation;

import React from "react";
import styled from "styled-components";

import TestItem from "./TestItem";

const items = [
  {
    id: 1,
    img: "https://images.pexels.com/photos/7296683/pexels-photo-7296683.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    title: "Bakery",
  },
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3269&q=80",
    title: "Beverages",
  },
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1559622214-f8a9850965bb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3294&q=80",
    title: "Snacks",
  },
];

const test = () => {
  return (
    <Wrapper>
      <div className="w_t w_u">
        {items.map((item, idx) => (
          <div key={idx} className="w_A1 w_B0 w_BD w_BH">
            <TestItem data={item} />
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 0 2.5rem;
  .w_t {
    display: flex;
    flex-wrap: wrap;
  }

  .w_u {
    margin-left: -12 px;
    margin-right: -12 px;
  }

  .w_A1 {
    box-sizing: border-box;
    flex: 0 0 auto;
  }

  .w_B0 {
    padding-left: 12 px;
    padding-right: 12 px;
  }

  .w_BH {
    width: 33.3333333333%;
  }
`;
export default test;

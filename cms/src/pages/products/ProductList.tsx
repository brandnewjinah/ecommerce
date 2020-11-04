import React, { FC, useEffect, useState } from "react";
import axios from "axios";

//import components

//import styles and assetss
import styled from "styled-components";

interface Props {}

const ProductList: FC<Props> = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data } = await axios.get("http://localhost:5000/product");
    setData(data.products);
  };

  return (
    <Wrapper>
      <h4>Inventory</h4>
      {data.map((p, idx) => (
        <div
          className={idx % 2 === 0 ? "container" : "container odd"}
          key={idx}
        >
          <div>{p.name}</div>
          <div>{p.price}</div>
          <div>{p.category}</div>
        </div>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }

  .odd {
    background-color: #e4e4e4;
  }
`;

export default ProductList;

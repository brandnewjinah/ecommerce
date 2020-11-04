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
      <p>{data.length} products total</p>
      <Container>
        {data.map((p, idx) => (
          <div
            className={idx % 2 === 0 ? "container" : "container odd"}
            key={idx}
          >
            <div className="code">{p.code}</div>
            <div className="name">{p.name}</div>
            <div className="price">{p.price}</div>
            <div className="cat">{p.category}</div>
          </div>
        ))}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .container {
    width: 100%;
    display: flex;

    padding: 1em;
  }

  .odd {
    background-color: #fafafa;
  }

  .code {
    width: 10%;
  }
  .name {
    width: 40%;
  }
  .price {
    width: 20%;
  }
  .cat {
    width: 30%;
  }
`;

const Container = styled.div`
  background-color: #fff;
  border: 1px solid #f4f4f4;
  border-radius: 0.5em;
`;

export default ProductList;

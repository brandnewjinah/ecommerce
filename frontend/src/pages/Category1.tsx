import React, { FC, useState, useEffect } from "react";
import axios from "axios";

//import components
import ProductCard from "../components/ProductCard";

//import styles and assets
import styled from "styled-components";

interface Props {}

const Category1: FC<Props> = () => {
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
      <h2>Products</h2>
      <Container>
        {data.map((product, idx) => (
          <div key={idx} className="col">
            <ProductCard
              name={product.name}
              price={product.price}
              img={product.img}
            />
          </div>
        ))}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  .col {
    margin: 0.25em;
  }

  @media (max-width: 1040px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default Category1;

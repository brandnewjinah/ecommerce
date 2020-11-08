import React, { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import config from "../config.json";
import axios from "axios";

//import components
import ProductCard from "../components/ProductCard";
import Filter from "../components/Filter";

//import styles and assets
import styled from "styled-components";

interface Props {}

const Category1: FC<Props> = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data } = await axios.get(`${config.API}/product`);
    // const { data } = await axios.get("./data/data.json");
    setData(data.products);
  };

  return (
    <Wrapper>
      <h2>Category</h2>
      <Filter />
      <Container>
        {data.map((product, idx) => (
          <div className="col" key={idx}>
            <Link to={`/1/${product.id}`}>
              <ProductCard
                name={product.name}
                price={product.price}
                imgsrc={product.image}
              />
            </Link>
          </div>
        ))}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* background-color: firebrick; */
  padding: 2em 0;

  h2 {
    font-size: 1.5rem;
  }
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .col {
    width: 32%;
    padding-right: 2%;
  }

  @media (max-width: 840px) {
    .col {
      width: 48%;
      padding: 0 2%;
    }
  }
`;

export default Category1;

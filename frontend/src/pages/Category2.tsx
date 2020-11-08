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

const Category2: FC<Props> = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    // const { data } = await axios.get(`${config.API}/product`);
    const { data } = await axios.get("./data/data.json");
    setData(data.products);
  };

  return (
    <Wrapper>
      <h2>Category</h2>
      <Filter />
      <Container>
        <div className="child">
          <img
            src="https://img-cf.kurly.com/shop/data/goods/1603094851954y0.jpg"
            alt=""
          />
        </div>
        <div className="child"></div>
        <div className="child"></div>
        <div className="child">4</div>
        <div className="child">5</div>
        <div className="child">6</div>
        <div className="child">7</div>
        <div className="child">8</div>
        <div className="child">9</div>

        {/* {data.map((product, idx) => (
          <Link key={idx} to={`/1/${product.id}`}>
            <div className="col">
              <ProductCard
                name={product.name}
                price={product.price}
                imgsrc={product.image}
              />
            </div>
          </Link>
        ))} */}
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

  .child {
    width: 32%;
    background-color: #faa2ee;
  }

  img {
    width: 100%;
    object-fit: cover;
  }
`;

export default Category2;

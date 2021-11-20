import React from "react";
import styled from "styled-components";

//import components
import Card from "./ProductCard";

const SimilarItems = ({ data, title, slidesPerView }) => {
  return (
    <Container>
      <h3>{title}</h3>
      <ProductsWrapper>
        {data.map((product) => (
          <Card
            key={product.sku}
            sku={product.sku}
            brand={product.brand}
            name={product.name}
            price={product.price}
            imageUrl={product.img}
            _id={product._id}
          />
        ))}
      </ProductsWrapper>
    </Container>
  );
};

const Container = styled.section`
  padding: 2rem 0;
  margin: 2rem 0;

  h3 {
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.05rem;
    position: relative;
    padding-bottom: 1.25rem;
    margin-bottom: 1.75rem;

    &:after {
      content: "";
      margin: auto;
      width: 30px;
      height: 3px;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: #000;
      opacity: 0.2;
      font-size: 1.5rem;
    }
  }
`;

const ProductsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export default SimilarItems;

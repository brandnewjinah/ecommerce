import React from "react";
import styled from "styled-components";
import Header from "../Header";
import { fontScale } from "../token";

//import components
import Card from "./ProductCard";

const SimilarItems = ({ data, title, slidesPerView }) => {
  return (
    <Container>
      <Header title={title} />
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
`;

const ProductsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export default SimilarItems;

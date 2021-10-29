import React from "react";
import styled from "styled-components";

//components
import Card from "./ProductCard";
import Grid from "./Grid";

const Products = ({ data }) => {
  return (
    <Container>
      <Grid>
        {data &&
          data.length > 0 &&
          data.map((product, idx) => (
            <Card
              key={idx}
              id={product.sku}
              brand={product.brand}
              name={product.name}
              currency={product.currency && product.currency.label}
              price={product.price}
              imageUrl={product.imgs[0].src}
            />
          ))}
      </Grid>
    </Container>
  );
};

const Container = styled.div``;

export default Products;

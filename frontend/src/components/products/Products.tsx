import React, { FC } from "react";
import styled from "styled-components";

//components
import Card from "./ProductCard";
import Grid from "../containers/Grid";

//interface
import { Product } from "../../interfaces/productInterface";

interface Props {
  products?: Product[];
}

const Products: FC<Props> = ({ products }) => {
  return (
    <Container>
      <Grid>
        {products &&
          products.length > 0 &&
          products.map((item, idx) => (
            <Card
              key={item.sku}
              sku={item.sku}
              brand={item.brand}
              name={item.name}
              price={item.price}
              imageUrl={item.img}
              _id={item._id}
            />
          ))}
      </Grid>
    </Container>
  );
};

const Container = styled.section``;

export default Products;

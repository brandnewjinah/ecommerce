import React, { useState, useEffect } from "react";
import _ from "lodash";
import styled from "styled-components";

//components
import Card from "./ProductCard";
import Grid from "../containers/Grid";

const Products = ({ products, category, filter, sort }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setFilteredProducts(
      category === "all" || filter === "all" || filter === ""
        ? products
        : products.filter((item) => item.category2.value === filter)
    );
  }, [category, filter, products]);

  useEffect(() => {
    if (sort === "Newest") {
      setFilteredProducts((prev) =>
        _.orderBy(prev, (item) => item.createdAt, ["desc"])
      );
    } else if (sort === "Price: low to high") {
      setFilteredProducts((prev) =>
        _.orderBy(prev, (item) => parseInt(item.price), ["asc"])
      );
    } else {
      setFilteredProducts((prev) =>
        _.orderBy(prev, (item) => parseInt(item.price), ["desc"])
      );
    }
  }, [sort]);

  return (
    <Container>
      <Grid>
        {filteredProducts &&
          filteredProducts.length > 0 &&
          filteredProducts.map((product, idx) => (
            <Card
              key={product.sku}
              sku={product.sku}
              brand={product.brand}
              name={product.name}
              currency={product.currency && product.currency.label}
              price={product.price}
              imageUrl={product.img}
              _id={product._id}
            />
          ))}
      </Grid>
    </Container>
  );
};

const Container = styled.section``;

export default Products;

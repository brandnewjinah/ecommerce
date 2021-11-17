import React, { useState, useEffect } from "react";
import _ from "lodash";
import styled from "styled-components";

//import components
import Hero from "../components/Hero";
import ProductSlider from "../components/products/ProductSlider";

//demo data
import Newsletter from "../components/Newsletter";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getNewProducts } from "../redux/productRedux";

const Home = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  useEffect(() => {
    dispatch(getNewProducts());
  }, [dispatch]);

  return (
    <Container>
      <Hero />
      <ProductSlider
        title="New Products"
        data={products}
        slidesPerView={{ small: 2, medium: 3, large: 4 }}
      />
      <Newsletter />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;

  img {
    width: 100%;
    height: 70vh;
    object-fit: cover;
  }
`;

export default Home;

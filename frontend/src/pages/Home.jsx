import React, { useState, useEffect } from "react";
import _ from "lodash";
import styled from "styled-components";

//import components
import Hero from "../components/Hero";
import ProductSlider from "../components/products/ProductSlider";

//demo data
import { demoProducts } from "../data/demoProducts";
import Newsletter from "../components/Newsletter";
import Test from "../components/Test";

const Home = () => {
  const [newProducts, setNewProducts] = useState();

  useEffect(() => {
    const getData = () => {
      let newest = _.orderBy(demoProducts, ["uploaded"], ["desc"]);
      newest = newest.slice(0, 10);
      setNewProducts(newest);
    };

    getData();
  }, []);

  return (
    <Container>
      <Hero />
      <ProductSlider
        title="New Products"
        data={newProducts}
        slidesPerView={{ small: 2, medium: 3, large: 4 }}
      />
      <Test />
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

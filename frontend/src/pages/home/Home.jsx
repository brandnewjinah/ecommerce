import React, { useState, useEffect } from "react";
import _ from "lodash";
import styled from "styled-components";

//import components
import Hero from "../../components/main/components/Hero";
import ProductSlider from "../../components/main/components/ProductSlider";

//demo data
import { demoProducts } from "../../data/demoProducts";
import Categories from "../../components/main/components/Categories";

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
      <ProductSlider data={newProducts} />
      <Categories />
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

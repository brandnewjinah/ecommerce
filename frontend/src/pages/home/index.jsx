import React, { useEffect } from "react";

//components
import Hero from "../../components/Hero";
import ProductSlider from "../../components/products/ProductSlider";
import Newsletter from "../../components/Newsletter";
import { Div, Flex } from "../../components/containers/Div";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/productListRedux";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts({ category: "new", page: 1 }));
  }, [dispatch]);

  const { products, isLoading } = useSelector((state) => state.products);

  return (
    <Div width="100%">
      <Hero />
      <Flex flexCol gap="4rem" width="100%" padding="4rem 0 2rem">
        <ProductSlider
          isLoading={isLoading}
          title="New Products"
          data={products}
          slidesPerView={{ small: 2, medium: 3, large: 4 }}
        />
        <Newsletter />
      </Flex>
    </Div>
  );
};

export default Home;

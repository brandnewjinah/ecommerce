import React, { useEffect } from "react";

//components
import Hero from "../../components/Hero";
import Categories from "../../components/Categories";
import ProductSlider from "../../components/products/ProductSlider";
import Newsletter from "../../components/Newsletter";
import { Div } from "../../components/containers/Div";
import { Section } from "../../components/containers/Section";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../redux/categoryRedux";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategory({ category: "new", page: 1 }));
  }, [dispatch]);

  const { products, isLoading } = useSelector((state) => state.category);

  return (
    <Div width="100%">
      <Hero />
      <Section gap="4rem" padding="4rem 1rem 2rem">
        <Categories />
        <ProductSlider
          isLoading={isLoading}
          title="New Products"
          data={products.data}
          slidesPerView={{ small: 2, medium: 3, large: 5 }}
        />
        <Newsletter />
      </Section>
    </Div>
  );
};

export default Home;

import React, { useEffect, useState } from "react";

//import libraries
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";

//import components
import Layout from "../../components/main/LayoutFull";
import { Card } from "../../components/main/ProductCard";

//import styles and assets
import styled from "styled-components";
import { ChevronLeft, ChevronRight } from "../../assets/Icons";

//redux
import { connect } from "react-redux";

SwiperCore.use(Navigation, Pagination);

const Home = (props) => {
  const [newProducts, setNewProducts] = useState();

  const loadProducts = () => {
    const newest = props.product.slice(-10);
    setNewProducts(newest);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Layout>
      <Wrapper>
        <Hero></Hero>
        <Main>
          {/* <Section>
            <ItemsCarousel
              requestToChangeActive={setActiveItemIndex}
              activeItemIndex={activeItemIndex}
              numberOfCards={2}
              gutter={20}
              leftChevron={<button>{"<"}</button>}
              rightChevron={<button>{">"}</button>}
              outsideChevron
              chevronWidth={chevronWidth}
            >
              {newProducts &&
                newProducts.length > 0 &&
                newProducts.map((p, idx) => (
                  <Card
                    key={idx}
                    id={p.sku}
                    brand={p.brand}
                    name={p.name}
                    currency={p.currency && p.currency.label}
                    price={p.price}
                    imageUrl={p.imgs[0].src}
                  />
                ))}
            </ItemsCarousel>
          </Section> */}
          <Section>
            <h6>New Products</h6>
            <Swiper
              navigation
              breakpoints={{
                300: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                // when window width is >= 320px
                600: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                // when window width is >= 480px
                740: {
                  slidesPerView: 4,
                  spaceBetween: 10,
                },
                // when window width is >= 1012px
                1012: {
                  slidesPerView: 5,
                  spaceBetween: 10,
                },
              }}
            >
              {newProducts &&
                newProducts.length > 0 &&
                newProducts.map((p, idx) => (
                  <SwiperSlide>
                    <Card
                      key={idx}
                      id={p.sku}
                      brand={p.brand}
                      name={p.name}
                      currency={p.currency && p.currency.label}
                      price={p.price}
                      imageUrl={p.imgs[0].src}
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
          </Section>
        </Main>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div``;

const Hero = styled.div`
  width: 100%;
  height: 60vh;
  background-color: #e8fccf;
`;

const Main = styled.main`
  width: 100%;
  max-width: 1024px;
  margin: 2em auto;
`;

const Section = styled.div`
  width: 100%;

  h6 {
    font-weight: 400;
    margin-bottom: 0.5em;
  }
`;

const mapStateToProps = (state) => {
  return {
    product: state.products.products,
  };
};

export default connect(mapStateToProps, null)(Home);

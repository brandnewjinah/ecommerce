import React, { useEffect, useState } from "react";

//import libraries
import styled from "styled-components";
import _ from "lodash";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";

//import components
import { Card } from "../../components/main/ProductCard";

//demo data
import { demoProducts } from "../../data/demo/demoProducts";

//redux
import { connect } from "react-redux";

SwiperCore.use(Navigation, Pagination);

const Home = (props) => {
  const [newProducts, setNewProducts] = useState();

  useEffect(() => {
    const getData = () => {
      let allData = [...demoProducts, ...props.product];
      let newest = _.orderBy(allData, ["uploaded"], ["desc"]);
      newest = newest.slice(0, 10);
      setNewProducts(newest);
    };

    getData();
  }, [props.product]);

  return (
    <Wrapper>
      main
      <Hero>
        <Content>
          <h1>treat yourself with something delicious</h1>
          <h4>Snacks for your coffee time and wine o'clock</h4>
        </Content>
      </Hero>
      <Main>
        <Section>
          <h6>New Products</h6>
          <Swiper
            navigation
            breakpoints={{
              300: {
                slidesPerView: 2,
                spaceBetween: 10,
              },

              // when window width is >= 480px
              740: {
                slidesPerView: 3,
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
                <SwiperSlide key={idx}>
                  <Card
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
  );
};

const Wrapper = styled.div``;

const Hero = styled.div`
  width: 100%;
  max-width: 1024px;
  height: 50vh;
  margin: 0 auto;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  h1 {
    font-family: "Playfair Display", serif;
    font-size: 5rem;
    letter-spacing: -0.15rem;
    line-height: 5.25rem;
    font-weight: 700;
    color: #ee7868;
  }

  h4 {
    font-size: 1.125rem;
    line-height: 2rem;
    letter-spacing: 0.125rem;
    color: #1b3456;
    margin-top: 1.5em;
  }

  @media (max-width: 1012px) {
    h1 {
      font-size: 4rem;
      line-height: 4.25rem;
    }
  }
`;

const Main = styled.main`
  width: 100%;
  max-width: 1024px;
  margin: 1.5em auto;

  @media (max-width: 1012px) {
    padding: 2em;
  }
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

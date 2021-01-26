import React, { useEffect, useState } from "react";
import _ from "lodash";

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
    <Layout>
      <Wrapper>
        <Hero>
          {/* <Image
            bgUrl={
              "https://images.unsplash.com/photo-1490731727228-d56f39758d0e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1500&q=80"
            }
          > */}
          {/* <Image
            bgUrl={
              "https://images.unsplash.com/photo-1465808029961-255e8fccc37d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1500&q=80"
            }
          > */}
          <Cover>
            <Content>
              <h1>treat yourself with something delicious</h1>
              <h4>Snacks for your coffee time and wine o'clock</h4>
            </Content>
          </Cover>
          {/* </Image> */}
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
  max-width: 960px;
  height: 50vh;
  margin: 0 auto;
`;

const Image = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgUrl});
  background-size: cover;
  background-position: 50% 60%;
  transition: opacity 0.1s linear;
`;

const Cover = styled.div`
  width: 100%;
  height: 100%;
  /* background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)); */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  text-align: center;
  padding-top: 1.5em;

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
  margin: 2em auto;

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

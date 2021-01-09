import React, { useEffect, useState } from "react";

//import librarys
import ItemsCarousel from "react-items-carousel";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

//import components
import Layout from "../../components/main/LayoutFull";
import { Card } from "../../components/main/ProductCard";

//import styles and assets
import styled from "styled-components";
import { ChevronLeft, ChevronRight } from "../../assets/Icons";

//redux
import { connect } from "react-redux";

const Home = (props) => {
  const [newProducts, setNewProducts] = useState();

  const loadProducts = () => {
    const newest = props.product.slice(-10);
    setNewProducts(newest);
  };

  const responsive = {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    1024: {
      items: 5,
    },
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);

  const slidePrev = () => setActiveIndex(activeIndex - 1);
  const slideNext = () => setActiveIndex(activeIndex + 1);
  const onSlideChanged = ({ item }) => setActiveIndex(item);

  return (
    <Layout>
      <Wrapper>
        <Hero></Hero>
        <Main>
          <Section>
            <h6>New Products</h6>
            <div className="b-refs-buttons">
              <button onClick={slidePrev}>Prev</button>
              <button onClick={slideNext}>Next</button>
            </div>
            <AliceCarousel
              responsive={responsive}
              disableDotsControls
              disableButtonsControls
              activeIndex={activeIndex}
              onSlideChanged={onSlideChanged}
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
            </AliceCarousel>
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

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import styled from "styled-components";

// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";

//import components
import Card from "./ProductCard";

//token
import { breakpoint, fontScale } from "../token";

SwiperCore.use([Navigation]);

const ProductSlider = ({ data, title, slidesPerView }) => {
  return (
    <Section>
      <Header>
        <h2>{title}</h2>
      </Header>
      <Slider>
        <Swiper
          navigation
          breakpoints={{
            100: {
              slidesPerView: slidesPerView.small,
              spaceBetween: 20,
            },
            // when window width is >= 640px
            640: {
              slidesPerView: slidesPerView.medium,
              spaceBetween: 20,
            },
            // when window width is >= 1024px
            1024: {
              slidesPerView: slidesPerView.large,
              spaceBetween: 20,
            },
          }}
        >
          {data &&
            data.length > 0 &&
            data.map((p, idx) => (
              <SwiperSlide key={idx}>
                <Card
                  sku={p.sku}
                  brand={p.brand}
                  name={p.name}
                  currency={p.currency && p.currency.label}
                  price={p.price}
                  imageUrl={p.img}
                  _id={p._id}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </Slider>
    </Section>
  );
};

const Section = styled.section`
  padding: 2rem 0;
`;

const Header = styled.header`
  h2 {
    font-size: ${fontScale.scale_b3};
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.03rem;
    position: relative;
    padding-bottom: 1.25rem;
    margin-bottom: 1.75rem;

    &:after {
      content: "";
      margin: auto;
      width: 30px;
      height: 3px;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: #000;
      opacity: 0.2;
      font-size: 1.5rem;
    }
  }
`;

const Slider = styled.div`
  .swiper-wrapper {
  }

  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .swiper-button-prev,
  .swiper-button-next {
    width: 40px;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.12);
    color: #fff;
    top: 45%;
    right: 0;
    transform: translate(0, -50%);

    &:after {
      font-size: 1.5rem;
    }
  }

  .swiper-button-prev {
    left: 0;
  }
`;

export default ProductSlider;

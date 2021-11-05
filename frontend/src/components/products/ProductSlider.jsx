import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import styled from "styled-components";

// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";

//import components
import Card from "./ProductCard";

SwiperCore.use([Navigation]);

const ProductSlider = ({ data, title, slidesPerView }) => {
  return (
    <Section>
      <h3>{title}</h3>
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
      </Slider>
    </Section>
  );
};

const Section = styled.section`
  padding: 2rem 0;

  h3 {
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.05rem;
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
  padding: 0 2.5rem;

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
    transform: translate(0, -50%);
    top: 40%;
    right: 0;
    padding: 5px;

    &:after {
      font-size: 1.5rem;
    }
  }

  .swiper-button-prev {
    left: 0;
  }
`;

export default ProductSlider;

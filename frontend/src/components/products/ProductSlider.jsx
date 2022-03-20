import React from "react";
import styled from "styled-components";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";

//Components
import { Section } from "../Container";
import Card from "./ProductCard";
import Header from "../Header";

SwiperCore.use([Navigation]);

const ProductSlider = ({ data, title, slidesPerView }) => {
  return (
    <Section padding="2rem 0">
      <Header title={title} />
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

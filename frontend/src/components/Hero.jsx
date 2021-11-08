import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";

// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";

//token
import { breakpoint } from "./token";

SwiperCore.use([Navigation]);

const Hero = () => {
  return (
    <Container>
      <Swiper navigation={true} className="mySwiper">
        <SwiperSlide>
          <img
            src="https://cdn.pixabay.com/photo/2021/01/18/12/49/ice-cream-5928048_1280.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://cdn.pixabay.com/photo/2017/07/31/22/25/pastel-2561613_1280.jpg"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </Container>
  );
};

const Container = styled.div`
  .swiper-button-prev,
  .swiper-button-next {
    width: 40px;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.12);
    color: #fff;
    transform: translate(0, -50%);
    top: 50%;
    right: 2.5rem;
    padding: 5px;

    &:after {
      font-size: 1.5rem;
    }
  }

  .swiper-button-prev {
    left: 2.5rem;
  }

  @media ${breakpoint.lg} {
    .swiper-button-prev,
    .swiper-button-next {
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
    }
  }
`;

export default Hero;

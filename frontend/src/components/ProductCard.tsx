import React, { FC } from "react";

//import styles and assets
import styled from "styled-components";
import { Image } from "../assets/Icons";
import Placeholder from "../assets/placeholder.jpg";

interface Props {
  category?: string;
  name?: string;
  price?: string;
  imgsrc?: string;
}

const ProductCard: FC<Props> = ({ category, name, price, imgsrc }) => {
  return (
    <Wrapper>
      <Top>
        {imgsrc ? (
          <img src={imgsrc} alt="" />
        ) : (
          <img src={Placeholder} alt="placeholder" />
        )}
      </Top>
      <Bottom>
        <h6 className="primary">{name}</h6>
        <h6 className="secondary">{price}</h6>
        <h4 className="tertiary">{category}</h4>
      </Bottom>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Top = styled.div`
  background-color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  img {
    width: 100%;
    object-fit: cover;
  }
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1em;

  h6.primary {
    text-transform: none;
    font-weight: 400;
    letter-spacing: 0;
  }
  h6.secondary {
    text-transform: none;
    letter-spacing: 0;
  }
`;

export default ProductCard;

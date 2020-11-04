import React, { FC } from "react";

//import styles and assets
import styled from "styled-components";
import { Image } from "../assets/Icons";

interface Props {
  category?: string;
  name?: string;
  price?: string;
  img?: string;
}

const ProductCard: FC<Props> = ({ category, name, price, img }) => {
  return (
    <Wrapper>
      <Top>
        {img ? (
          <img src="" alt="" />
        ) : (
          <Image width="20" height="20" color="#000" stroke="2" />
        )}
      </Top>
      <Bottom>
        <h4 className="primary">{name}</h4>
        <h4 className="secondary">{price}</h4>
        <h4 className="tertiary">{category}</h4>
      </Bottom>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  background-color: #f7f5f4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Top = styled.div`
  height: 385px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h4.primary {
    text-transform: none;
    font-weight: 400;
    letter-spacing: 0;
  }
  h4.secondary {
    text-transform: none;
    letter-spacing: 0;
  }
`;

export default ProductCard;

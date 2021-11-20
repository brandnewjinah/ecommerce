import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

//components
import { TextButton, Button } from "../Button";

//token and icons
import { typeScale, neutral, breakpoint, primaryColor } from "../token";
import { ImageIcon } from "../../assets/Icons";

//redux
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartRedux";

const ProductCard = ({
  imageUrl,
  brand,
  name,
  price,
  sku,
  currency,
  _id,
  wishlist,
  handleDelete,
}) => {
  const dispatch = useDispatch();
  const [imgErr, setImgErr] = useState(false);

  const handleDefaultImg = (e) => {
    if (e.type === "error") {
      setImgErr(true);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ _id, qty: 1 }));
  };

  return (
    <Wrapper>
      <Link to={{ pathname: `/product/${sku}`, state: { _id } }}>
        <ImageContainer>
          {imgErr ? (
            <ErrImg>
              <ImageIcon width="20" height="20" color="#8F8F8F" stroke="2" />
            </ErrImg>
          ) : (
            <Image
              onError={handleDefaultImg}
              src={imageUrl ? imageUrl : setImgErr(true)}
            />
          )}
        </ImageContainer>
        <Details>
          <p className="sub">{brand}</p>
          <p className="main">
            {name.length > 26 ? `${name.substring(0, 24)}...` : name}
          </p>
          <p>
            <span>{currency}</span>
            <span>{price}</span>
          </p>
        </Details>
      </Link>
      {wishlist && (
        <WishlistContainer>
          <TextButton
            label="Add To Cart"
            color={primaryColor.button}
            handleClick={handleAddToCart}
          />
          <TextButton
            label="Remove"
            color={neutral[300]}
            handleClick={handleDelete}
          />
        </WishlistContainer>
      )}
    </Wrapper>
  );
};

const Flex = css`
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div`
  ${Flex}
  width: 100%;
  flex-direction: column;
  padding-bottom: 1em;
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: auto !important;
  object-fit: cover;
  object-position: 0 -25px;
`;

const ImageContainer = styled.div`
  position: relative;
  height: 360px;
  overflow: hidden;

  &:hover {
    ${Image} {
      opacity: 0.3;
    }
  }
`;

const ErrImg = styled.div`
  ${Flex}
  justify-content: center;
  min-height: 169px;
`;

const Details = styled.div`
  width: 100%;
  font-size: ${typeScale.body};
  font-weight: 500;
  color: ${neutral[600]};
  padding-top: 1rem;

  .sub {
    font-size: ${typeScale.helper};
    text-transform: uppercase;
    letter-spacing: 0.05rem;
    color: ${neutral[400]};
  }

  .main {
    padding: 0.25rem 0 0.35rem;
    font-weight: 600;
  }

  @media ${breakpoint.m} {
    padding-top: 0;
  }
`;

const WishlistContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

export default ProductCard;

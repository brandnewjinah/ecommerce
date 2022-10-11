import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

//components
import { TextButton } from "../Button";
import { neutral, breakpoint, primaryColor } from "../token";
import { ImageIcon } from "../../assets/Icon";
import Text from "../Text";
import { Div } from "../containers/Divs";

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
        <Div>
          <Text variant="caption" bold color={neutral[400]}>
            {brand}
          </Text>
          <Text variant="body_small" lineHeight="sm4">
            {name.length > 26 ? `${name.substring(0, 24)}...` : name}
          </Text>
          <Text variant="body_small">
            <span>{currency}</span>
            <span>{price}</span>
          </Text>
        </Div>
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
  width: 100%;
  height: 100%;

  a {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  @media ${breakpoint.m} {
    a {
      gap: 0.75rem;
    }
  }
`;

const Image = styled.img`
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  object-fit: cover;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 125%;
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

const WishlistContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

export default ProductCard;

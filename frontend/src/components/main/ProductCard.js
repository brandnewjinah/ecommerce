import React, { useState } from "react";
import { Link } from "react-router-dom";

//import styles and assets
import styled from "styled-components";
import { ImageIcon } from "../../assets/Icons";
import colors from "../Colors";

export const Card = ({ imageUrl, brand, name, price, id, currency }) => {
  const [imgErr, setImgErr] = useState(false);

  const handleDefaultImg = (e) => {
    if (e.type === "error") {
      setImgErr(true);
    }
  };

  return (
    <Link to={`/detail/${id}`}>
      <CardWrapper>
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
          <div className="sub">{brand}</div>
          <div className="main">
            {name.length > 26 ? `${name.substring(0, 24)}...` : name}
          </div>
          <div className="caption">
            {currency}
            {price}
          </div>
        </Details>
      </CardWrapper>
    </Link>
  );
};

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const CardWrapper = styled(Flex)`
  width: 100%;
  flex-direction: column;
  padding-bottom: 1em;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  max-height: 220px;
  object-fit: cover;
  transition: opacity 0.1s linear;
  /* box-shadow: 0 2px 6px 2px rgba(0, 0, 0, 0.1); */
`;

const ErrImg = styled(Flex)`
  justify-content: center;
  min-height: 169px;
`;

const ImageContainer = styled.div`
  position: relative;
  /* border: 1px solid ${colors.lightgray}; */
  /* padding: 1em; */

  &:hover {
    ${Image} {
      opacity: 0.3;
    }
  }
`;

const Details = styled.div`
  width: 100%;
  padding-top: 0.5em;

  .sub {
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.075rem;
    line-height: 0.875rem;
    color: ${colors.gray};
  }
  .main {
    font-size: 0.825rem;
    color: ${colors.darkestgray};
  }
  p {
    font-size: 0.75rem;
  }
  .caption {
    font-size: 0.75rem;
    color: ${colors.darkestgray};
  }
`;

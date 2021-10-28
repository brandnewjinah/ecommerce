import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

//components
import Breadcrumbs from "../../components/Breadcrumbs";
import Counter from "../../components/Counter";
import { Button } from "../../components/Button";

//token and imgs
import {
  breakpoint,
  neutral,
  primaryColor,
  typeScale,
} from "../../components/token";
import { Heart } from "../../assets/Icon";

//demo data
import { demoProducts } from "../../data/demo/demoProducts";

const Detail = (props) => {
  let { id } = useParams();

  const [data, setData] = useState({});

  useEffect(() => {
    const getData = () => {
      const thisItem = demoProducts.find((product) => product.sku === id);
      setData({ ...thisItem, qty: 1 });
    };
    getData();
  }, [id]);

  const handleAdd = () => {};

  const handleDecrease = () => {
    if (data.qty > 1) {
      setData({ ...data, qty: data.qty - 1 });
    }
  };

  const handleIncrease = () => {
    setData({ ...data, qty: data.qty + 1 });
  };

  return (
    <Container>
      <Breadcrumbs item1={data.category1} item2={data.category2} />
      <Main>
        <ImageContainer>
          <img src={data.imgs && data.imgs[0].src} alt="" />
        </ImageContainer>
        <Info>
          <Article>
            <p className="helper">{data.brand}</p>
            <p className="title">{data.name}</p>
          </Article>
          <Article>
            <p className="helper">Price</p>
            <p className="title">
              {data.currency && data.currency.label}
              {data.price}
            </p>
          </Article>
          <Article>
            <p className="helper">Size</p>
            <p>{data.size}</p>
          </Article>
          <Article>
            <p className="helper">Description</p>
            <p className="body">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              dignissim maximus ullamcorper. Integer venenatis, dui quis
              eleifend blandit, velit sem vulputate eros, vitae cursus risus dui
              tincidunt nisl.
            </p>
          </Article>
          <Article>
            <p className="helper">Quantity</p>
            <div className="counter">
              <Counter
                qty={data.qty}
                handleDecrease={() => handleDecrease()}
                handleIncrease={() => handleIncrease()}
              />
            </div>
          </Article>
          <ButtonContainer>
            <div className="cart">
              <Button
                label="Add to Cart"
                color={primaryColor.button}
                handleClick={handleAdd}
              />
            </div>
            <div className="wishlist">
              <Button
                label="Wishlist"
                shape="outline"
                fontColor="#002C66"
                color="#002C66"
                icon={
                  <Heart width={20} height={20} color="#002C66" stroke={2} />
                }
                handleClick={handleAdd}
              />
            </div>
          </ButtonContainer>
        </Info>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1280px;
  padding: 1rem 2.5rem;
  margin: 0 auto;
`;

const Main = styled.main`
  display: flex;

  @media ${breakpoint.lg} {
    flex-direction: column;
  }
`;

const ImageContainer = styled.div`
  min-width: 430px;
  background-color: #eee;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    object-fit: cover;
  }

  @media ${breakpoint.lg} {
    margin: 0 auto;
  }
`;

const Info = styled.section`
  flex: 1;
  padding-left: 2rem;
`;

const Article = styled.article`
  padding: 0.75rem 0;
  border-bottom: 1px solid ${neutral[100]};

  .helper {
    font-size: ${typeScale.helper};
    color: ${neutral[400]};
  }

  .title {
    font-size: ${typeScale.header3};
  }

  .body {
    font-size: ${typeScale.sbody};
    line-height: 1.5rem;
  }

  .counter {
    margin: 0.875rem 0;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  .cart {
    flex: 2;
  }

  .wishlist {
    flex: 1;
  }
`;

export default Detail;

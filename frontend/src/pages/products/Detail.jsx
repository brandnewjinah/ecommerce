import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

//components
import Breadcrumbs from "../../components/Breadcrumbs";
import Counter from "../../components/Counter";
import { Button } from "../../components/Button";
import Card from "../../components/ProductCard";

//token and imgs
import { breakpoint, primaryColor } from "../../components/token";
import { Heart } from "../../assets/Icon";

//demo data
import { demoProducts } from "../../data/demoProducts";
import InfoArticle from "./InfoArticle";

const Detail = () => {
  let { id } = useParams();

  const [data, setData] = useState({});
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    const getData = () => {
      const thisItem = demoProducts.find((product) => product.sku === id);
      setData({ ...thisItem, qty: 1 });
      let similarItems = demoProducts.filter(
        (product) =>
          product.category2.id === thisItem.category2.id && product.sku !== id
      );
      setSimilar(similarItems);
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
        <ImageWrapper>
          <img src={data.imgs && data.imgs[0].src} alt="" />
        </ImageWrapper>
        <InfoWrapper>
          <InfoArticle helper={data.brand} title={data.name} />
          <InfoArticle
            helper="Price"
            title={`${data.currency && data.currency.label}${data.price}`}
          />
          <InfoArticle helper="Size" title={data.size} />
          <InfoArticle
            helper="Description"
            body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              dignissim maximus ullamcorper. Integer venenatis, dui quis
              eleifend blandit, velit sem vulputate eros, vitae cursus risus dui
              tincidunt nisl."
          />
          <InfoArticle helper="Quantity">
            <div className="counter">
              <Counter
                qty={data.qty}
                handleDecrease={() => handleDecrease()}
                handleIncrease={() => handleIncrease()}
              />
            </div>
          </InfoArticle>
          <ButtonWrapper>
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
          </ButtonWrapper>
        </InfoWrapper>
      </Main>
      {similar && similar.length > 0 && (
        <SimilarWrapper>
          <h4>You may also like</h4>
          <SimilarProducts>
            {similar.map((p, idx) => (
              <Card
                key={idx}
                id={p.sku}
                brand={p.brand}
                name={p.name}
                currency={p.currency && p.currency.label}
                price={p.price}
                imageUrl={p.imgs[0].src}
              />
            ))}
          </SimilarProducts>
        </SimilarWrapper>
      )}
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

const ImageWrapper = styled.section`
  flex: 1;
  min-width: 430px;

  img {
    width: 100%;
    object-fit: cover;
  }

  @media ${breakpoint.lg} {
    margin: 0 auto;
  }
`;

const InfoWrapper = styled.section`
  flex: 1;
  padding-left: 2rem;
`;

const ButtonWrapper = styled.div`
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

const SimilarWrapper = styled.div`
  padding: 2rem 0;
`;

const SimilarProducts = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;

  @media (max-width: 980px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export default Detail;

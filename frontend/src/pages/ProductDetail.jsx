import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

//components
import Breadcrumbs from "../components/Breadcrumbs";
import Counter from "../components/Counter";
import { Button } from "../components/Button";
import SimilarItems from "../components/products/SimilarItems";
import InfoItem from "../components/products/ProductInfoItem";
import Reviews from "../components/products/ProductReviews";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

//token and imgs
import { breakpoint, primaryColor } from "../components/token";
import { Heart } from "../assets/Icon";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail } from "../redux/productDetailRedux";
import { addToCart } from "../redux/cartRedux";
import * as api from "../api";

const Detail = () => {
  const location = useLocation();
  const _id = location.state && location.state._id;

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const [qty, setQty] = useState(1);

  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    dispatch(getProductDetail(_id));
  }, [dispatch, _id]);

  useEffect(() => {
    const getSimilarProducts = async () => {
      try {
        const res = await api.getSimilarProducts(_id, product.category2.id);
        setSimilar(res.data);
      } catch {}
    };
    getSimilarProducts();
  }, [product]);

  const handleDecrease = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const handleIncrease = () => {
    setQty(qty + 1);
  };

  const handleWishlist = () => {};

  const handleAddToCart = () => {
    dispatch(addToCart({ _id: product._id, qty }));
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage>{`${error} this is error message component`}</ErrorMessage>
      ) : (
        <Container>
          <Breadcrumbs item1={product.category1} item2={product.category2} />
          <Main>
            <ImageWrapper>
              <img src={product.imgs && product.imgs[0].src} alt="" />
            </ImageWrapper>
            <InfoWrapper>
              <InfoItem helper={product.brand} title={product.name} />
              <InfoItem helper="Price" title={`$${product.price}`} />
              <InfoItem helper="Size" title={product.size} />
              <InfoItem
                helper="Description"
                body="dLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              dignissim maximus ullamcorper. Integer venenatis, dui quis
              eleifend blandit, velit sem vulputate eros, vitae cursus risus dui
              tincidunt nisl."
              />
              <InfoItem helper="Quantity">
                <div className="counter">
                  <Counter
                    qty={qty}
                    handleDecrease={() => handleDecrease()}
                    handleIncrease={() => handleIncrease()}
                  />
                </div>
              </InfoItem>
              <ButtonWrapper>
                <div className="cart">
                  <Button
                    label="Add to Cart"
                    color={primaryColor.button}
                    handleClick={handleAddToCart}
                  />
                </div>
                <div className="wishlist">
                  <Button
                    label="Wishlist"
                    shape="outline"
                    fontColor="#002C66"
                    color="#002C66"
                    icon={
                      <Heart
                        width={20}
                        height={20}
                        color="#002C66"
                        stroke={2}
                      />
                    }
                    handleClick={handleWishlist}
                  />
                </div>
              </ButtonWrapper>
            </InfoWrapper>
          </Main>
          <Extras>
            {similar && similar.length > 0 && (
              <SimilarItems
                title="You may also like"
                data={similar}
                // slidesPerView={{ small: 2, medium: 3, large: 3 }}
              />
            )}
            <Reviews title="Reviews" />
          </Extras>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  max-width: 1280px;
  padding: 3rem 2.5rem;
  margin: 0 auto;

  @media ${breakpoint.lg} {
    padding: 0;
  }
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
    min-width: 300px;
    width: 100%;
    margin: 0 auto;
  }
`;

const InfoWrapper = styled.section`
  flex: 1;
  padding-left: 2rem;

  @media ${breakpoint.lg} {
    padding: 1rem;
  }
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

const Extras = styled.div`
  max-width: 800px;
  padding: 2rem 0;
  margin: 0 auto;
`;

export default Detail;

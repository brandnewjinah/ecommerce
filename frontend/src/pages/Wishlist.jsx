import React, { useEffect } from "react";
import styled from "styled-components";

// components
import { Container, HeaderContainer } from "../components/layout/Containers";
import Grid from "../components/layout/Grid";
import Card from "../components/products/ProductCard";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getWishlist, removeFromWishlist } from "../redux/wishlistRedux";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { typeScale } from "../components/token";

const ProductList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  const wishlist = useSelector((state) => state.wishlist);
  const { products, loading, error } = wishlist;

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage>{`${error} this is error message component`}</ErrorMessage>
      ) : (
        <>
          <HeaderContainer title="Wishlist" />
          {!wishlist.products && (
            <Copy>
              You haven't saved anything to your wishlist. Add items to your
              wishlist and personalize your shopping experience.
            </Copy>
          )}
          <Wrapper>
            <Grid>
              {products &&
                products.map((item, idx) => (
                  <Card
                    key={item._id}
                    sku={item.product.sku}
                    brand={item.product.brand}
                    name={item.product.name}
                    currency={
                      item.product.currency && item.product.currency.label
                    }
                    price={item.product.price}
                    imageUrl={item.product.img}
                    _id={item.product._id}
                    wishlist={true}
                    handleDelete={() =>
                      dispatch(removeFromWishlist(item.product._id))
                    }
                  />
                ))}
            </Grid>
          </Wrapper>
        </>
      )}
    </Container>
  );
};

const Wrapper = styled.div`
  margin: 2rem 0;
`;

const Copy = styled.div`
  font-size: ${typeScale.body};
  text-align: center;
  padding: 1rem;
`;

export default ProductList;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//comp
import Grid from "../../components/containers/Grid";
import { Header } from "../../components/Header";
import Loading from "../../components/Loading";
import ProductCard from "../../components/products/ProductCard";
import { Section } from "../../components/containers/Section";
import { Body } from "../../components/Text";
import { Button } from "../../components/Button";
import { primaryColor } from "../../components/token";

//redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getWishlist, removeFromWishlist } from "../../redux/wishlistRedux";
import { Div, Flex } from "../../components/containers/Div";

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getWishlist(""));
  }, [dispatch]);

  const { isLoading, wishlist } = useSelector(
    (state: RootState) => state.wishlist
  );

  return isLoading ? (
    <Loading />
  ) : (
    <>
      {wishlist.status !== 200 ? (
        <>
          <Header title="Wishlist" body="Your wishlist is empty" />
          <Section padding="6rem 0">
            <Div width="70%" margin="0 auto">
              <Body align="center">Start Shopping</Body>
              <Button
                label="Shop Now"
                color={primaryColor.button}
                handleClick={() => navigate("../category/all")}
                margin="1rem 0"
              />
            </Div>
          </Section>
        </>
      ) : (
        <>
          <Header title="Wishlist" />
          <Grid>
            {wishlist.products.map((item, idx) => (
              <ProductCard
                key={item._id}
                sku={item.product.sku}
                brand={item.product.brand}
                name={item.product.name}
                price={item.product.price}
                imageUrl={item.product.img}
                _id={item.product._id}
                wishlist={true}
                handleDelete={() =>
                  dispatch(removeFromWishlist(item.product._id!))
                }
              />
            ))}
          </Grid>
        </>
      )}
    </>
  );
};

export default Wishlist;

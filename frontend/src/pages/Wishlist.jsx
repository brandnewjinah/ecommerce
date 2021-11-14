import React, { useEffect } from "react";

// components
import { Container, HeaderContainer } from "../components/layout/Containers";
import Grid from "../components/layout/Grid";
import Card from "../components/products/ProductCard";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getWishlist, removeFromWishlist } from "../redux/wishlistRedux";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

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
            <p>
              You haven't saved anything to your wishlist. Add items to your
              wishlist and personalize your shopping experience.
            </p>
          )}
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
                  imageUrl={item.product.imgs[0].src}
                  _id={item.product._id}
                  wishlist={true}
                  handleDelete={() =>
                    dispatch(removeFromWishlist(item.product._id))
                  }
                />
              ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default ProductList;

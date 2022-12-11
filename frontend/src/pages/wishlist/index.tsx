import React, { useEffect } from "react";

//comp
import Grid from "../../components/containers/Grid";
import { Header } from "../../components/Header";
import Loading from "../../components/Loading";
import ProductCard from "../../components/products/ProductCard";

//redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getWishlist, removeFromWishlist } from "../../redux/wishlistRedux";

const Wishlist = () => {
  const dispatch = useDispatch();

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
        <>error</>
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

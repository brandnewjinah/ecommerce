import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

//comp
import Loading from "../../components/Loading";
import Breadcrumbs from "../../components/Breadcrumbs";
import { Flex } from "../../components/containers/Div";
import { Section } from "../../components/containers/Section";
import ImageContainer from "../../components/ImageContainer";
import { ProductInfo } from "./ProductInfoItem";
import Counter from "../../components/Counter";
import { Button } from "../../components/Button";
import { primaryColor } from "../../components/token";
import { Heart } from "../../assets/Icon";
import SimilarItems from "../../components/products/SimilarItems";
import Reviews from "../../components/products/ProductReviews";

//redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  getProductDetails,
  getSimilarProducts,
} from "../../redux/productDetailRedux";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../../redux/wishlistRedux";
import { addToCart } from "../../redux/cart";
import { ProductHeader } from "../../components/Header";

const ProductDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productId } = useParams<{ productId: string }>();

  //product details
  useEffect(() => {
    dispatch(getProductDetails(productId!));
  }, [dispatch, productId]);

  const { isLoading, productDetails } = useSelector(
    (state: RootState) => state.productDetail
  );
  const product = productDetails.product;

  //similar products

  useEffect(() => {
    dispatch(
      getSimilarProducts({ productId, categoryId: product.category2.id })
    );
  }, [dispatch, productId, product.category2._id]);

  const { similarProducts } = useSelector(
    (state: RootState) => state.productDetail
  );

  //add to cart
  const [qty, setQty] = useState(1);

  const handleDecrease = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ productId, qty }));
  };

  //wishlist
  const { token } = useSelector((state: RootState) => state.auth.currentUser);

  useEffect(() => {
    dispatch(getWishlist(""));
  }, [dispatch]);

  const { products } = useSelector(
    (state: RootState) => state.wishlist.wishlist
  );

  const isWishlist =
    products &&
    products.length > 0 &&
    products.find((item) => item.product._id === product._id);

  const handleWishlist = () => {
    if (isWishlist) {
      dispatch(removeFromWishlist(productId!));
    } else {
      token && token !== ""
        ? dispatch(addToWishlist(productId!))
        : navigate(`/login?redirectTo=products/${productId}`, {
            state: { _id: productId },
          });
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <Breadcrumbs
        category1={product.category1}
        category2={product.category2}
      />
      <Flex bgColor="honeydew" gap="3rem" lgFlexCol>
        <ImageContainer imgUrl={product.img} minWidth="430px" />
        <Section className="flexOne">
          <ProductHeader overline={product.brand} title={product.name} />
          <ProductInfo helper="Price" subtitle={`$${product.price}`} />
          <ProductInfo helper="Size" subtitle={product.size} />
          <ProductInfo
            helper="Description"
            body="dLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              dignissim maximus ullamcorper. Integer venenatis, dui quis
              eleifend blandit, velit sem vulputate eros, vitae cursus risus dui
              tincidunt nisl."
          />
          <ProductInfo helper="Quantity">
            <Counter
              qty={qty}
              handleDecrease={() => handleDecrease()}
              handleIncrease={() => setQty(qty + 1)}
            />
          </ProductInfo>
          <Flex gap="1rem" padding="1rem 0">
            <Button
              label="Add to Cart"
              color={primaryColor.button}
              handleClick={handleAddToCart}
            />
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
                  fill={isWishlist ? "#002C66" : "none"}
                  stroke={2}
                />
              }
              handleClick={handleWishlist}
            />
          </Flex>
        </Section>
      </Flex>
      <Section>
        {similarProducts.status === 200 &&
          similarProducts.products.length > 0 && (
            <SimilarItems
              title="Similar Items"
              data={similarProducts.products}
              // slidesPerView={{ small: 2, medium: 3, large: 3 }}
            />
          )}
      </Section>
      <Reviews />
    </>
  );
};

export default ProductDetail;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//comp
import Loading from "../../components/Loading";
import Breadcrumbs from "../../components/Breadcrumbs";
import { Flex } from "../../components/containers/Div";
import ImageContainer from "../../components/ImageContainer";
import { Section } from "../../components/containers/Section";
import { InfoItem, ProductInfo } from "./ProductInfoItem";
import Counter from "../../components/Counter";
import { Button } from "../../components/Button";
import { primaryColor } from "../../components/token";
import { Heart } from "../../assets/Icon";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../redux/productDetailRedux";
import { RootState } from "../../redux/store";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { productId } = useParams<{ productId: string }>();

  //get product details
  useEffect(() => {
    dispatch(getProductDetails(productId!));
  }, [dispatch, productId]);

  const productDetail = useSelector((state: RootState) => state.productDetail);
  const { isLoading, productDetails } = productDetail;

  //add to cart
  const [qty, setQty] = useState(1);

  const handleDecrease = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const handleAddToCart = () => {};

  //handle wishlist
  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  const { products } = useSelector((state: RootState) => state.wishlist);

  const isWishlist =
    products &&
    products.find((item) => item.product._id === productDetails._id);

  const handleWishlist = () => {
    // if (isWishlist) {
    //   dispatch(removeFromWishlist(product._id));
    // } else {
    //   currentUser && currentUser.token
    //     ? dispatch(addToWishlist(product._id))
    //     : history.push(`/signin?redirectTo=product/${product.sku}`, {
    //         _id: product._id,
    //       });
    // }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <Breadcrumbs
        category1={productDetails.category1}
        category2={productDetails.category2}
      />
      <Flex bgColor="honeydew" gap="3rem" lgFlexCol>
        <ImageContainer imgUrl={productDetails.img} />
        <Section className="flexOne">
          <InfoItem
            overline={productDetails.brand}
            title={productDetails.name}
          />
          <ProductInfo helper="Price" subtitle={`$${productDetails.price}`} />
          <ProductInfo helper="Size" subtitle={productDetails.size} />
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
    </>
  );
};

export default ProductDetail;

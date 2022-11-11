import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//comp
import { Heading } from "../../components/Text";
import { primaryColor } from "../../components/token";
import { Button } from "../../components/Button";
import { Div, Flex } from "../../components/containers/Div";
import ProductSlider from "../../components/products/ProductSlider";
import CartSummary from "../../components/CartSummary";

//redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getProducts } from "../../redux/productListRedux";
import CartItem from "./CartItem";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //get cart items
  const { products } = useSelector((state: RootState) => state.cartTest);

  //   useEffect(() => {
  //     dispatch(getProducts({ category: "new", page: 1 }));
  //   }, [dispatch]);

  return (
    <>
      {products && products.length > 0 ? (
        <>
          <Heading title="Your Shopping Bag" />
          <Flex alignItems="start" gap="4rem">
            <ul className="flexTwo">
              {products.map((item, idx) => (
                <CartItem key={idx} data={item} />
              ))}
            </ul>
            <aside className="flexOne">
              <CartSummary />
            </aside>
          </Flex>
        </>
      ) : (
        <>
          <Div maxWidth="400px" margin="0 auto">
            <Heading title="Cart Empty" />
            <Button
              label="Let's go shopping"
              color={primaryColor.button}
              handleClick={() => navigate("/category/all")}
            />
          </Div>
          {/* <ProductSlider
          isLoading={isLoading}
          title="New Products"
          data={products}
          slidesPerView={{ small: 2, medium: 3, large: 4 }}
        /> */}
        </>
      )}
    </>
  );
};

export default Cart;

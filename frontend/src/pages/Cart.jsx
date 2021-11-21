import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import _ from "lodash";
import styled from "styled-components";

//import components
import {
  ContainerSmall,
  HeaderContainer,
} from "../components/layout/Containers";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import { Button } from "../components/Button";
import ProductSlider from "../components/products/ProductSlider";
import { breakpoint, primaryColor } from "../components/token";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getNewProducts } from "../redux/productRedux";

const Cart = () => {
  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  const loggedIn = auth.currentUser && auth.currentUser.token;

  const [newProducts, setNewProducts] = useState();

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  useEffect(() => {
    dispatch(getNewProducts());
  }, [dispatch]);

  const handleClick = (path) => {
    path === "checkout" && loggedIn
      ? history.push("/checkout")
      : path === "checkout"
      ? history.push("/signin?redirectTo=checkout")
      : history.push("/products/all");
  };

  return (
    <ContainerSmall>
      {cart.products && cart.products.length > 0 ? (
        <Main>
          <Items>
            {cart.products.map((item, idx) => (
              <CartItem key={idx} data={item} />
            ))}
          </Items>
          <Summary>
            <CartSummary handleClick={() => handleClick("checkout")} />
          </Summary>
        </Main>
      ) : (
        <Empty>
          <Top>
            <HeaderContainer title="Your cart is empty" />
            <Button
              label="Let's go shopping"
              color={primaryColor.button}
              handleClick={() => handleClick("shop")}
            />
          </Top>

          <ProductSlider
            title="Recommended Products"
            data={products}
            slidesPerView={{ small: 2, medium: 3, large: 4 }}
          />
        </Empty>
      )}
    </ContainerSmall>
  );
};

const Main = styled.main`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;

  @media ${breakpoint.lg} {
    flex-direction: column;
  }
`;

const Items = styled.section`
  flex: 2;
  /* justify-content: center;
  align-items: center; */
`;

const Summary = styled.aside`
  flex: 1;
`;

const Empty = styled.div``;

const Top = styled.section`
  max-width: 400px;
  margin: 0 auto;

  button {
    margin: 2rem 0;
  }
`;

export default Cart;

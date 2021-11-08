import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

//import components
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";

const Cart = () => {
  const history = useHistory();
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

  console.log(products);

  const [loggedIn, setLoggedIn] = useState(
    JSON.parse(localStorage.getItem("currentUser")) &&
      JSON.parse(localStorage.getItem("currentUser")).token
  );

  const handleShop = () => {
    history.push("/products/all");
  };

  const handleClick = () => {
    loggedIn
      ? history.push("/checkout")
      : history.push("/signin?redirectTo=CHECKOUT");
  };

  return (
    <Container>
      <Main>
        <Items>
          {products && products.length > 0 ? (
            products.map((item, idx) => <CartItem key={idx} data={item} />)
          ) : (
            <p>cart empty. shop items here and maybe show recommended items</p>
          )}
        </Items>
        <Summary>
          <CartSummary handleClick={handleClick} />
        </Summary>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  max-width: 80rem;
  padding: 0 1.5rem;
  margin: 4rem auto;

  .flex {
    display: flex;
  }

  .link a {
    color: #6b6b6b;
    text-decoration: underline;
  }
`;

const Main = styled.main`
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media (max-width: 840px) {
    flex-direction: column;
  }
`;

const Items = styled.div`
  flex: 0 1 69%;
  justify-content: center;
  align-items: center;

  @media (max-width: 840px) {
    margin: 0 auto;
  }
`;

const Summary = styled.div`
  flex: 0 1 29%;

  .btn {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 2em 0;
  }
  .four {
    flex: 0 1 40%;
  }

  .six {
    flex: 0 1 59%;
  }
`;

export default Cart;

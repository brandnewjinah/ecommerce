import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

//components
import { Container, HeaderContainer } from "../layout/Containers";
import { Header } from "../layout/Header";
import CartSummary from "../components/cart/CartSummary";

//import redux
import { placeOrder, resetOrder } from "../redux/orderRedux";
import { clearCart } from "../redux/cartRedux";
import Shipping from "./checkout/Shipping";
import Delivery from "./checkout/Delivery";
import Payment from "./checkout/Payment";
import { breakpoint } from "../components/token";

const Checkout = () => {
  const [step, setStep] = useState(1);
  const history = useHistory();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const order = useSelector((state) => state.order);
  const { isSuccess, orderDetail, shipping, delivery, payment } = order;

  const handleClick = () => {
    const total = cart.products.reduce((total, item) => {
      return item.price * item.qty + total;
    }, 0);
    const thisOrder = {
      shipping,
      delivery,
      payment,
      orderItems: cart.products,
      total: total,
    };

    dispatch(placeOrder(thisOrder));
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearCart());
      dispatch(resetOrder());
      history.push(`/confirmation/${orderDetail._id}`);
    }
  }, [dispatch, order, isSuccess, history]);

  const handleStep = (num) => {
    setStep(num);
  };

  return (
    <Container>
      <Header title="Checkout" />
      <MainWrapper>
        <Main>
          <Shipping
            handleStep={(num) => handleStep(num)}
            step={step}
            info={shipping}
          />
          <Delivery handleStep={handleStep} step={step} info={delivery} />
          <Payment handleStep={handleStep} step={step} info={payment} />
        </Main>
        <SummaryWrapper>
          <CartSummary step={step} handleClick={handleClick} />
        </SummaryWrapper>
      </MainWrapper>
    </Container>
  );
};

const MainWrapper = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1.5rem 0;

  @media ${breakpoint.lg} {
    flex-direction: column;
  }
`;

const Main = styled.main`
  flex: 5;
  flex-direction: column;

  @media (max-width: 840px) {
    flex-direction: column;
  }
`;

const SummaryWrapper = styled.aside`
  flex: 2;
`;

export default Checkout;

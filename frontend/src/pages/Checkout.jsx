import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

//components
import { Container, HeaderContainer } from "../components/layout/Containers";
import CartSummary from "../components/cart/CartSummary";

//import redux
import { placeOrder, resetOrder } from "../redux/orderRedux";
import { clearCart } from "../redux/cartRedux";
import Shipping from "./checkout/Shipping";
import Delivery from "./checkout/Delivery";
import Payment from "./checkout/Payment";

const Checkout = () => {
  const [step, setStep] = useState(1);
  const history = useHistory();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const order = useSelector((state) => state.order);
  const { success, orderDetail, shipping, delivery, payment } = order;

  const onSubmit = (data) => {
    const total = cart.products.reduce((total, item) => {
      return item.price * item.qty + total;
    }, 0);
    const thisOrder = {
      shipping: {
        firstName: data.firstName,
        lastName: data.lastName,
        address1: data.address1,
        address2: data.address2,
        city: data.city,
        state: data.state,
        zip: data.zip,
        phone: data.phone,
        shipping: data.shipping,
      },
      billing: {
        firstName: data.billingFirstName,
        lastName: data.billingLastName,
        cardNumber: data.cardNumber.slice(-4),
      },
      orderItems: cart.products,
      total: total,
    };

    dispatch(placeOrder(thisOrder));
  };

  useEffect(() => {
    if (success) {
      dispatch(clearCart());
      history.push(`/confirmation/${orderDetail._id}`);
      dispatch(resetOrder());
    }
  }, [dispatch, order, success, history]);

  const handleStep = (num) => {
    setStep(num);
  };

  return (
    <Container>
      <HeaderContainer title="Checkout" />

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
          <CartSummary step={step} />
        </SummaryWrapper>
      </MainWrapper>
    </Container>
  );
};

const MainWrapper = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1.5rem 0;
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

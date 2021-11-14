import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

//components
import { Container, HeaderContainer } from "../components/layout/Containers";
import CartSummary from "../components/cart/CartSummary";
import { Input } from "../components/Input";
import Selector from "../components/Selector";

//import redux
import { placeOrder, resetOrder } from "../redux/orderRedux";
import { clearCart } from "../redux/cartRedux";

const Checkout = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const order = useSelector((state) => state.order);
  const { success, orderDetail } = order;

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    shipping: "standard",
    billingFirstName: "",
    billingLastName: "",
    cardNumber: "",
    expiration: "",
    security: "",
  });

  const validate = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    address1: Yup.string().required("Street address is required"),
    zip: Yup.string().required("Zip Code is required"),
    billingFirstName: Yup.string().required("Zip Code is required"),
    billingLastName: Yup.string().required("Zip Code is required"),
    cardNumber: Yup.number().required("Card Number is required"),
    expiration: Yup.string().required("Expiration Date is required"),
    security: Yup.number().required("Security Code is required"),
  });

  const handleSubmit = (values) => {
    const total = cart.products.reduce((total, item) => {
      return item.price * item.qty + total;
    }, 0);
    const thisOrder = {
      shipping: {
        firstName: values.firstName,
        lastName: values.lastName,
        address1: values.address1,
        address2: values.address2,
        city: values.city,
        state: values.state,
        zip: values.zip,
        phone: values.phone,
        shipping: values.shipping,
      },
      billing: {
        firstName: values.billingFirstName,
        lastName: values.billingLastName,
        cardNumber: values.cardNumber.slice(-4),
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

  return (
    <Container>
      <HeaderContainer title="Checkout" />
      <Formik
        initialValues={data}
        validationSchema={validate}
        onSubmit={(values) => handleSubmit(values)}
      >
        {(formik) => (
          <Form>
            <MainWrapper>
              <Main>
                <Section>
                  <h5>1. Shipping Address</h5>
                  <Item>
                    <Input label="First Name" name="firstName" />
                    <Input label="Last Name" name="lastName" />
                  </Item>
                  <Item>
                    <Input label="Street Address" name="address1" />
                  </Item>
                  <Item>
                    <Input
                      label="Address 2"
                      name="address2"
                      placeholder="Building, Suite or Apartment Number"
                    />
                  </Item>
                  <Item>
                    <Input label="City" name="city" />
                    <Input label="State" name="state" />
                  </Item>
                  <Item>
                    <Input label="Zip Code" name="zip" />
                    <Input label="Phone Number" name="phone" />
                  </Item>
                </Section>
                <Section>
                  <h5>2. Delivery Options</h5>
                  <Selector
                    name="shipping"
                    data={[
                      {
                        type: "standard",
                        desc: "4-8 business days - Free",
                      },
                      {
                        type: "express",
                        desc: "1-3 business days - $15.00",
                      },
                    ]}
                    defaultValue={data.shipping}
                    handleSelected={(value) =>
                      setData({ ...data, shipping: value })
                    }
                  />
                </Section>
                <Section>
                  <h5>3. Payment Method</h5>
                  <Item>
                    <Input label="First Name" name="billingFirstName" />
                    <Input label="Last Name" name="billingLastName" />
                  </Item>
                  <Input
                    label="Card Number"
                    name="cardNumber"
                    placeholder="0000 0000 0000 1234"
                  />
                  <Item>
                    <Input
                      label="Expiration Date"
                      name="expiration"
                      placeholder="MM/YY"
                    />
                    <Input label="Security Code" name="security" />
                  </Item>
                </Section>
              </Main>
              <SummaryWrapper>
                <CartSummary />
              </SummaryWrapper>
            </MainWrapper>
          </Form>
        )}
      </Formik>
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

const Section = styled.div`
  background-color: #fff;
  box-shadow: 0 0 30px 0 rgba(63, 76, 105, 0.05);
  border-radius: 0.25em;
  padding: 2em;
  margin-bottom: 1em;

  h5 {
    text-transform: uppercase;
    letter-spacing: 0.075rem;
    padding: 0.875rem 0;
  }

  .item {
    margin-bottom: 1em;
  }
`;

const Item = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  div {
    flex: 1;
  }
`;

const SummaryWrapper = styled.aside`
  flex: 2;
`;

export default Checkout;

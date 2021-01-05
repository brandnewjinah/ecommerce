import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

//import components
import Layout from "../../components/main/Layout";
import CartSummary from "../cart/CartSummary";
import Input from "../../components/Input";

//import styles and assets
import styled from "styled-components";
import colors from "../../components/Colors";

//import redux
import { connect } from "react-redux";
import { addCart } from "../../reducers/cartReducer";

const Checkout = (props) => {
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
  });

  const [errors, setErrors] = useState({});

  const handleChange = ({ currentTarget: input }) => {
    const userInput = { ...data };
    userInput[input.name] = input.value;
    setData(userInput);
  };

  const handleShipping = ({ currentTarget: select }) => {
    const userInput = { ...data };
    userInput.shipping = select.value;
    setData(userInput);
  };

  return (
    <Layout>
      <Wrapper>
        <Main>
          <Form>
            <Container>
              <h6>1. Shipping Address</h6>
              <Flex>
                <div className="five">
                  <Input
                    label="First Name"
                    name="brand"
                    value={data.firstName}
                    error={errors.firstName}
                    handleChange={handleChange}
                  />
                </div>
                <div className="five">
                  <Input
                    label="Last Name"
                    name="sku"
                    value={data.lastName}
                    error={errors.lastName}
                    handleChange={handleChange}
                  />
                </div>
              </Flex>
              <div className="item">
                <Input
                  label="Street Address"
                  name="address1"
                  value={data.address1}
                  error={errors.address1}
                  handleChange={handleChange}
                />
              </div>
              <div className="item">
                <Input
                  label="Address 2"
                  name="address2"
                  placeholder="Building, Suite or Apartment Number"
                  value={data.address2}
                  error={errors.address2}
                  handleChange={handleChange}
                />
              </div>
              <Flex>
                <div className="five">
                  <Input
                    label="City"
                    name="city"
                    value={data.city}
                    error={errors.city}
                    handleChange={handleChange}
                  />
                </div>
                <div className="five">
                  <Input
                    label="State"
                    name="state"
                    value={data.state}
                    error={errors.state}
                    handleChange={handleChange}
                  />
                </div>
              </Flex>
              <Flex>
                <div className="five">
                  <Input
                    label="Zip Code"
                    name="zip"
                    value={data.zip}
                    error={errors.zip}
                    handleChange={handleChange}
                  />
                </div>
                <div className="five">
                  <Input
                    label="Phone Number"
                    name="phone"
                    value={data.phone}
                    error={errors.phone}
                    handleChange={handleChange}
                  />
                </div>
              </Flex>
            </Container>
            <Container>
              <h6>2. Delivery Options</h6>
              <Selector>
                <input
                  type="radio"
                  value="standard"
                  name="standard"
                  checked={data.shipping === "standard"}
                  onChange={handleShipping}
                />
                <div className="desc">
                  <p>4-8 business days - Free</p>
                  <p>Standard Shipping</p>
                </div>
              </Selector>
              <Selector>
                <input
                  type="radio"
                  value="express"
                  name="express"
                  checked={data.shipping === "express"}
                  onChange={handleShipping}
                />
                <div className="desc">
                  <p>1-3 business days - $15.00</p>
                  <p>Express Shipping</p>
                </div>
              </Selector>
            </Container>
            <Container>
              <h6>3. Payment Method</h6>
              <Flex>
                <div className="five">
                  <Input
                    label="First Name"
                    name="brand"
                    value={data.firstName}
                    error={errors.firstName}
                    handleChange={handleChange}
                  />
                </div>
                <div className="five">
                  <Input
                    label="Last Name"
                    name="sku"
                    value={data.lastName}
                    error={errors.lastName}
                    handleChange={handleChange}
                  />
                </div>
              </Flex>
              <div className="item">
                <Input
                  label="Card Number"
                  name="cardNumber"
                  placeholder="0000 0000 0000 1234"
                  value={data.cardNumber}
                  error={errors.cardNumber}
                  handleChange={handleChange}
                />
              </div>
              <Flex>
                <div className="five">
                  <Input
                    label="Expiration Date"
                    name="expiration"
                    placeholder="MM/YY"
                    value={data.expiration}
                    error={errors.expiration}
                    handleChange={handleChange}
                  />
                </div>
                <div className="five">
                  <Input
                    label="Security Code"
                    name="security"
                    value={data.security}
                    error={errors.security}
                    handleChange={handleChange}
                  />
                </div>
              </Flex>
            </Container>
          </Form>
          <Summary>
            <CartSummary />
          </Summary>
        </Main>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  max-width: 1040px;
  margin: 0 auto;
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

const Form = styled.div`
  flex: 0 1 69%;
  justify-content: center;
  align-items: center;

  @media (max-width: 840px) {
    margin: 0 auto;
  }
`;

const Container = styled.div`
  background-color: #fff;
  box-shadow: 0 0 30px 0 rgba(63, 76, 105, 0.05);
  border-radius: 0.25em;
  padding: 2em;
  margin-bottom: 1em;

  h6 {
    text-transform: uppercase;
    letter-spacing: 0.125rem;
    margin-bottom: 1em;
  }

  .item {
    margin-bottom: 1em;
  }

  .label {
    font-weight: 400;
    color: ${colors.darkergray};
  }

  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Flex = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;

  .one {
    flex: 0 1 9%;
  }

  .two {
    flex: 0 1 20%;
  }

  .five {
    flex: 0 1 49%;
  }

  .eight {
    flex: 0 1 79%;
  }

  .nine {
    flex: 0 1 90%;
  }
`;

const Summary = styled.div`
  flex: 0 1 29%;

  h5 {
    margin: 0.75em 0;
  }

  h6 {
    font-weight: 400;
  }

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

const Selector = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${colors.lightgray};
  padding: 1.5em;
  margin: 0.875em 0;

  p {
    color: ${colors.darkestgray};
    line-height: 1.25rem;

    &:last-child {
      color: ${colors.gray};
    }
  }

  .desc {
    margin-left: 2em;
  }
`;

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
  };
};

export default connect(mapStateToProps, { addCart })(Checkout);

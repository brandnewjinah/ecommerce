import React from "react";

//import components
import Layout from "../../components/main/Layout";

//import styles and assets
import styled from "styled-components";

const OrderConfirmation = () => {
  return (
    <Layout>
      <Wrapper>
        <Header>
          <h4>THANK YOU</h4>
          <p>
            We are getting started on your order right away, and you will
            receive order confirmation email shortly.
          </p>
        </Header>
        <Details>
          <h6>Order Details - #823583</h6>
          <div className="flex">
            <div className="three">
              <p>Shipping Address</p>
              <p>26803 Basswood Ave.</p>
            </div>
            <div className="three">
              <p>Delivery Method</p>
              <p>Standard Delivery</p>
            </div>
            <div className="three">
              <p>Payment Method</p>
              <p>Visa ****1234</p>
            </div>
          </div>
        </Details>
        <Summary>
          <h6>Summary</h6>
        </Summary>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 2em;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  p {
    width: 50%;
    line-height: 1.25rem;
  }
`;

const Details = styled.main`
  width: 100%;
  padding: 2em 0;

  p {
    line-height: 1.25rem;
  }

  .flex {
    display: flex;
  }

  .three {
    flex: 0 1 33.3%;
  }
`;

const Summary = styled.div`
  padding: 2em 0;
`;

export default OrderConfirmation;

import React from "react";

//import components
import Layout from "../../components/main/Layout";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

//import styles and assets
import styled from "styled-components";

//import redux
import { connect } from "react-redux";
import { addCart } from "../../reducers/cartReducer";

const Cart = (props) => {
  return (
    <Layout>
      <Wrapper>
        <h2>Cart</h2>
        {props.qty === 0 ? (
          <Main>
            <p>Cart empty</p>
          </Main>
        ) : (
          <Main>
            <Items>
              {props.cart &&
                props.cart.length > 0 &&
                props.cart.map((item, idx) => <CartItem data={item} />)}
            </Items>
            <Summary>
              <CartSummary />
            </Summary>
          </Main>
        )}
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  max-width: 1040px;
  margin: 0 auto;
  padding-top: 1em;

  h2 {
    font-size: 1.5rem;
    text-transform: capitalize;
    text-align: center;
    padding: 1em 0;
  }

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

  p {
    text-align: center;
  }

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

const Details = styled.div``;

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
    qty: state.cart.qty,
  };
};

export default connect(mapStateToProps, { addCart })(Cart);

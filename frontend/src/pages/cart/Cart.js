import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

//import components
import Layout from "../../components/main/Layout";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

//import styles and assets
import styled from "styled-components";
import colors from "../../components/Colors";

//import redux
import { connect } from "react-redux";
import { addCart } from "../../reducers/cartReducer";

const Cart = (props) => {
  let { id } = useParams();

  const [data, setData] = useState({});

  const handleDecrease = () => {
    if (data.qty > 1) {
      setData({ ...data, qty: data.qty - 1 });
    }
  };

  const handleIncrease = () => {
    setData({ ...data, qty: data.qty + 1 });
  };

  return (
    <Layout>
      <Wrapper>
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
        <Details>details</Details>
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
  };
};

export default connect(mapStateToProps, { addCart })(Cart);

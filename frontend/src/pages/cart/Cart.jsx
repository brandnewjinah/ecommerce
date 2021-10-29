import React from "react";
import { useHistory } from "react-router-dom";

//import components
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import { Button } from "../../components/Button";

//import styles and assets
import styled from "styled-components";

//import demo data
import { demoCart } from "../../data/demo/demoCart";

//import redux
import { connect } from "react-redux";
import { addCart } from "../../reducers/cartReducer";

const Cart = (props) => {
  const history = useHistory();
  const handleShop = () => {
    history.push("/products/all");
  };

  const handleClick = () => {
    history.push("/checkout");
  };

  return (
    <Wrapper>
      <h2>Cart</h2>
      <Main>
        <Items>
          {demoCart &&
            demoCart.length > 0 &&
            demoCart.map((item, idx) => <CartItem data={item} />)}
        </Items>
        <Summary>
          <CartSummary handleClick={handleClick} />
        </Summary>
      </Main>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding-top: 1em;

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

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
    qty: state.cart.qty,
  };
};

export default connect(mapStateToProps, { addCart })(Cart);

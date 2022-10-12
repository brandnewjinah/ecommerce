import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

//import components
import { Button } from "../Button";

//token
import { neutral, primaryColor, fontSize } from "../token";

const Article = ({ left, right }) => {
  return (
    <Item>
      <p>{left}</p>
      <p>{right}</p>
    </Item>
  );
};

const CartSummary = ({ handleClick, submitType, step }) => {
  let location = useLocation();
  const path = location.pathname.split("/")[1];
  const products = useSelector((state) => state.cart.products);
  const shipping = useSelector((state) => state.order.delivery.shipping);
  const shippingCost = shipping === "Express" ? 15 : 0;
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const calcSubTotal = () => {
      const result = products.reduce((total, item) => {
        return total + item.price * item.qty;
      }, 0);
      setSubtotal(result);
    };

    calcSubTotal();
  }, [products]);

  return (
    <Container>
      <Top>
        <Summary>
          <Article left="Subtotal" right={`$${subtotal.toFixed(2)}`} />
          <Article left="Shipping" right={`$${shippingCost}.00`} />
          <Article left="Estimated Tax" right="$0.00" />
        </Summary>
        <Total>
          <p>Total</p>
          {/* <p>${subtotal.toFixed(2)}</p> */}
          <p>${(subtotal + shippingCost).toFixed(2)}</p>
        </Total>
      </Top>
      <Bottom>
        <Button
          label={path === "checkout" ? "PLACE ORDER" : "CHECKOUT"}
          color={primaryColor.button}
          disabled={step && step !== 4 && true}
          handleClick={handleClick}
        />
      </Bottom>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  background-color: ${neutral[50]};
`;

const Top = styled.div`
  font-weight: 500;
  color: ${neutral[600]};
  padding: 2rem 2rem 1rem;
`;

const Summary = styled.div`
  padding: 0 0 0.75rem;
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid ${neutral[200]};
  padding: 1.25rem 0 0;
`;

const Bottom = styled.div`
  padding: 1rem 2rem 2rem;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${fontSize.sm2};
  padding: 0.5em 0;

  p {
    line-height: 1.5rem;
  }
`;

export default CartSummary;

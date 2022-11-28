import React, { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

//comp
import { Div, Flex } from "./containers/Div";
import { Button } from "./Button";
import { Body } from "./Text";
import Hr from "./Hr";
import { neutral, primaryColor } from "./token";

//redux
import { RootStateOrAny, useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface Props {
  step?: number;
  handleClick?: () => void;
}

const CartSummary: FC<Props> = ({ step, handleClick }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const [subtotal, setSubtotal] = useState(0);
  const { products } = useSelector((state: RootState) => state.cartTest);
  const { shipping } = useSelector(
    (state: RootStateOrAny) => state.order.delivery
  );
  const shippingCost = shipping === "Express" ? 15 : 0;

  useEffect(() => {
    const calcSubTotal = () => {
      const result = products.reduce((total, item) => {
        return total + item.price * item.qty!;
      }, 0);
      setSubtotal(result);
    };

    calcSubTotal();
  }, [products]);

  return (
    <Div
      bgColor={path === "checkout" ? "#fff" : neutral[50]}
      padding="1rem 2rem"
    >
      <Div padding="1rem 0">
        <Flex padding=".5rem 0">
          <Body variant="body_small">Subtotal</Body>
          <Body variant="body_small">{`$${subtotal.toFixed(2)}`}</Body>
        </Flex>
        <Flex padding=".5rem 0">
          <Body variant="body_small">Shipping</Body>
          <Body variant="body_small">{`$${shippingCost}.00`}</Body>
        </Flex>
        <Flex padding=".5rem 0">
          <Body variant="body_small">Tax</Body>
          <Body variant="body_small">Calculated later</Body>
        </Flex>
      </Div>
      <Hr color={neutral[300]} />
      <Flex padding="1rem 0">
        <Body variant="body_small">Total</Body>
        <Body variant="body_small">{`$${(subtotal + shippingCost).toFixed(
          2
        )}`}</Body>
      </Flex>
      <Div padding="1rem 0">
        <Button
          label={path === "checkout" ? "PLACE ORDER" : "CHECKOUT"}
          color={primaryColor.button}
          disabled={step === 4 ? false : true}
          handleClick={handleClick}
        />
      </Div>
    </Div>
  );
};

export default CartSummary;

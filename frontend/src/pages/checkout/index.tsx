import React, { useState } from "react";

//comp
import CartSummary from "../../components/CartSummary";
import { Div, Flex } from "../../components/containers/Div";
import { Heading } from "../../components/Text";
import Shipping from "./Shipping";

//redux
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Checkout = () => {
  const { shipping } = useSelector((state: RootState) => state.checkout);
  const [step, setStep] = useState(1);

  const handleClick = () => {};

  return (
    <div>
      <Heading title="Checkout" />
      <Flex alignItems="start" gap="4rem" padding=" 1rem 0">
        <Div className="flexTwo">
          <Shipping
            step={step}
            info={shipping}
            handleStep={(num) => setStep(num)}
          />
        </Div>
        <aside className="flexOne">
          <CartSummary handleClick={handleClick} />
        </aside>
      </Flex>
    </div>
  );
};

export default Checkout;

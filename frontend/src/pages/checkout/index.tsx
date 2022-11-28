import React, { useState } from "react";

//comp
import CartSummary from "../../components/CartSummary";
import { Div, Flex } from "../../components/containers/Div";
import { Heading } from "../../components/Text";
import Shipping from "./Shipping";

//redux
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Delivery from "./Delivery";
import Payment from "./Payment";
import { Section } from "../../components/containers/Section";

const Checkout = () => {
  const { shipping, delivery, payment } = useSelector(
    (state: RootState) => state.checkout
  );
  const [step, setStep] = useState(3);

  const handleClick = () => {};

  return (
    <div>
      <Heading title="Checkout" />
      <Flex alignItems="start" gap="4rem" padding=" 1rem 0">
        <Section gap="1rem" className="flexTwo">
          <Shipping
            step={step}
            info={shipping}
            handleStep={(num) => setStep(num)}
          />
          <Delivery
            step={step}
            info={delivery}
            handleStep={(num) => setStep(num)}
          />
          <Payment
            step={step}
            info={payment}
            handleStep={(num) => setStep(num)}
          />
        </Section>
        <aside className="flexOne">
          <CartSummary step={step} handleClick={handleClick} />
        </aside>
      </Flex>
    </div>
  );
};

export default Checkout;

import React, { useState, FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//comp
import CartSummary from "../../components/CartSummary";
import { Flex } from "../../components/containers/Div";
import { Section } from "../../components/containers/Section";
import { Heading } from "../../components/Text";
import Shipping from "./Shipping";
import Delivery from "./Delivery";
import Payment from "./Payment";

//redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { placeOrder, reset } from "../../redux/checkoutRedux";
import { clearCart } from "../../redux/cart";

const Checkout: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shipping, delivery, payment } = useSelector(
    (state: RootState) => state.checkout
  );
  const { products } = useSelector((state: RootState) => state.cartTest);
  const [step, setStep] = useState(1);

  const handlePlaceOrder = () => {
    const total = products.reduce((total, item) => {
      return item.price * item.qty! + total;
    }, 0);

    const thisOrder = {
      shipping,
      delivery,
      payment,
      orderItems: products,
      total,
    };

    dispatch(placeOrder(thisOrder));
    navigate("/confirmation");
  };

  //actions after submitting order
  const { orderAdded } = useSelector((state: RootState) => state.checkout);

  useEffect(() => {
    if (orderAdded.status === 200) {
      dispatch(clearCart());
      dispatch(reset());
      navigate(`/confirmation/${orderAdded._id}`);
    }
  }, [dispatch, orderAdded.status, orderAdded._id]);

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
          <CartSummary step={step} handleClick={handlePlaceOrder} />
        </aside>
      </Flex>
    </div>
  );
};

export default Checkout;

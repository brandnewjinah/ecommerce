import React, { useEffect, useState } from "react";

//import components
import { Button } from "../../components/Button";

//import styles and assets
import styled from "styled-components";
import colors from "../../components/Colors";

//import redux
import { connect } from "react-redux";

const CartSummary = (props) => {
  const [subtotal, setSubtotal] = useState(0);

  const calcSubTotal = () => {
    props.cart.reduce((total, item) => {
      setSubtotal(total + item.price * item.qty);
    }, 0);
  };

  useEffect(() => {
    calcSubTotal();
  }, [props.cart]);

  return (
    <Wrapper>
      <Section>
        <p>Subtotal</p>
        <p>{subtotal}</p>
      </Section>
      <Section>
        <p>Shipping</p>
        <p>TBD</p>
      </Section>
      <Section>
        <p>Estimated Tax</p>
        <p>$0.00</p>
      </Section>
      <Total>
        <p>Total</p>
        <p>hello</p>
      </Total>
      <Button label="PROCEED TO CHECKOUT" type="fill" color="#002C66" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  border: 1px solid ${colors.lightgray};
  padding: 1.5em;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Section = styled(Flex)`
  font-size: 0.8rem;
  color: ${colors.darkgray};
  padding: 0.5em 0;

  p {
    line-height: 1.5rem;
  }
`;

const Total = styled(Flex)`
  font-weight: 400;
  color: ${colors.black};
  border-top: 1px solid ${colors.lightgray};
  padding: 0.75em 0;
`;

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
  };
};

export default connect(mapStateToProps, null)(CartSummary);

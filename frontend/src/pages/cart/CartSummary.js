import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

//import components
import { Button } from "../../components/Button";

//import styles and assets
import styled from "styled-components";
import colors from "../../components/Colors";

//import redux
import { connect } from "react-redux";

const CartSummary = (props) => {
  let location = useLocation();
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const calcSubTotal = () => {
      const result = props.cart.reduce((total, item) => {
        return item.price * item.qty + total;
      }, 0);
      setSubtotal(result);
    };

    calcSubTotal();
  }, [props.cart]);

  return (
    <Wrapper>
      <Section>
        <p>Subtotal</p>
        <p>${subtotal.toFixed(2)}</p>
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
        <p>${subtotal.toFixed(2)}</p>
      </Total>
      {location.pathname.includes("/checkout") ? (
        <Button
          label="PLACE ORDER"
          type="fill"
          color="#002C66"
          handleClick={props.handleClick}
        />
      ) : (
        <Button
          label="PROCEED TO CHECKOUT"
          type="fill"
          color="#002C66"
          handleClick={props.handleClick}
        />
      )}
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

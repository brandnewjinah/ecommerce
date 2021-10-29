import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

//import components
import { Button } from "../../components/Button";

//token
import { neutral, typeScale } from "../../components/token";

//import redux
import { connect } from "react-redux";

const Article = ({ left, right }) => {
  return (
    <Item>
      <p>{left}</p>
      <p>{right}</p>
    </Item>
  );
};

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
    <Container>
      <Article left="Subtotal" right={`$${subtotal.toFixed(2)}`} />
      <Article left="Shipping" right="TBD" />
      <Article left="Estimated Tax" right="$0.00" />
      <Total>
        <p>Total</p>
        <p>${subtotal.toFixed(2)}</p>
      </Total>
      {location.pathname.includes("/checkout") ? (
        <Button
          label="PLACE ORDER"
          color="#002C66"
          handleClick={props.handleClick}
        />
      ) : (
        <Button
          label="PROCEED TO CHECKOUT"
          color="#002C66"
          handleClick={props.handleClick}
        />
      )}
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  border: 1px solid ${neutral[100]};
  padding: 1.5em;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Item = styled(Flex)`
  font-size: ${typeScale.sbody};
  color: ${neutral[300]};
  padding: 0.5em 0;

  p {
    line-height: 1.5rem;
  }
`;

const Total = styled(Flex)`
  font-weight: 400;
  color: ${neutral[500]};
  border-top: 1px solid ${neutral[300]};
  padding: 0.75em 0;
`;

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
  };
};

export default connect(mapStateToProps, null)(CartSummary);

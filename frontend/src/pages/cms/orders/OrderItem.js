import React from "react";

//import styles and assets
import styled from "styled-components";

import colors from "../../../components/Colors";

const OrderItem = (props) => {
  return (
    <Wrapper>
      <Detail>
        <div className="two">
          <img src={props.data.img && props.data.img.src} alt="" />
        </div>
        <div className="four">
          <p>{props.data.name}</p>
          <p className="sub">SKU: {props.data.sku}</p>
        </div>
        <div className="two">
          <p className="sub">
            {`${props.data.currency.label}${props.data.price}`}
          </p>
        </div>
        <div className="two sub">x {props.data.qty}</div>
        <div className="two end">{`${props.data.currency.label}${
          props.data.price * props.data.qty
        }`}</div>
      </Detail>
    </Wrapper>
  );
};

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid ${colors.lightgray};
  padding: 1em;
`;

const Detail = styled(Flex)`
  display: flex;
  align-items: center;
  flex: 0 1 65%;

  .two {
    flex: 0 1 20%;
    max-width: 60px;
    display: flex;
    align-items: center;
  }

  .four {
    flex: 0 1 39%;
  }

  img {
    width: 100%;
    object-fit: cover;
  }

  .sub {
    color: ${colors.darkgray};
  }

  .end {
    justify-content: flex-end;
  }
`;

export default OrderItem;

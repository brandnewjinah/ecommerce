import React from "react";

//import styles and assets
import styled from "styled-components";

import colors from "../../components/Colors";

const OrderItem = (props) => {
  return (
    <Wrapper>
      <Detail>
        <div className="image">
          <img src={props.data.img && props.data.img.src} alt="" />
        </div>
        <div className="detail">
          <p>{props.data.name}</p>
          <p className="price">
            {`${props.data.currency.label}${props.data.price}`} x{" "}
            {props.data.qty}
          </p>
        </div>
      </Detail>
      <Calc>
        <div>{`${props.data.currency.label}${
          props.data.price * props.data.qty
        }`}</div>
      </Calc>
    </Wrapper>
  );
};

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Wrapper = styled(Flex)`
  width: 100%;
  border-top: 1px solid ${colors.lightgray};
  padding: 1em 0;
`;

const Detail = styled.div`
  display: flex;
  align-items: center;
  flex: 0 1 65%;

  .image {
    max-width: 60px;
    display: flex;
    align-items: center;
  }

  .detail {
    margin-left: 2em;
  }

  .price {
    color: ${colors.darkgray};
  }

  img {
    width: 100%;
    object-fit: cover;
  }
`;

const Calc = styled(Flex)`
  flex: 0 1 35%;
  margin-right: 2em;
`;

export default OrderItem;

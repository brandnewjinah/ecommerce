import React from "react";
import styled from "styled-components";

import { typeScale, neutral } from "./token";

const OrderItem = ({ item }) => {
  return (
    <Container>
      <Left>
        <div className="image">
          <img src={item.img} alt="" />
        </div>
        <div className="detail">
          <p className="main">{item.name}</p>
          <p className="price">{`$${item.price}`}</p>
        </div>
      </Left>
      <Right>
        <p className="price">{`qty ${item.qty}`}</p>
        <div>{`$${item.price * item.qty}`}</div>
      </Right>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  padding: 0.5rem 0;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  flex: 4;
  font-size: ${typeScale.body};
  font-weight: 500;
  color: ${neutral[600]};

  .image {
    max-width: 60px;
    display: flex;
    align-items: center;
  }

  .detail {
    margin-left: 2em;
  }

  .main {
    padding: 0.25rem 0 0.35rem;
    font-weight: 600;
  }

  .price {
    color: ${neutral[400]};
  }

  img {
    width: 100%;
    object-fit: cover;
  }
`;

const Right = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 2;
  margin-right: 2em;
`;

export default OrderItem;

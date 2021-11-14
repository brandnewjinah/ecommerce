import React from "react";
import styled from "styled-components";

const OrderItem = ({ item }) => {
  return (
    <Container>
      <div>{item.name}</div>
      <div>{item.price}</div>
      <div>{item.qty}</div>
      <div>{item.name}</div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

export default OrderItem;

import React from "react";

//import styles and assets
import styled from "styled-components";

const Counter = (props) => {
  return (
    <Container>
      <Control>
        <div onClick={() => props.handleDecrease()}>-</div>
        <div>{props.qty}</div>
        <div onClick={() => props.handleIncrease()}>+</div>
      </Control>
    </Container>
  );
};

const Container = styled.div``;

const Control = styled.div`
  display: flex;
  /* justify-content: center;
  align-items: center; */
  div {
    min-width: 30px;
    text-align: center;
  }
  div:first-child {
    border: 1px solid #d1d1d1;
    cursor: pointer;
    &:hover {
      border: 1px solid black;
    }
  }
  div:nth-child(2) {
    border-top: 1px solid #d1d1d1;
    border-bottom: 1px solid #d1d1d1;
  }
  div:last-child {
    border: 1px solid #d1d1d1;
    cursor: pointer;
    &:hover {
      border: 1px solid black;
    }
  }
`;

export default Counter;

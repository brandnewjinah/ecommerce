import React, { FC } from "react";
import styled from "styled-components";

interface Props {
  qty?: number;
  handleDecrease?: () => void;
  handleIncrease?: () => void;
}

const Counter: FC<Props> = ({ qty, handleDecrease, handleIncrease }) => {
  return (
    <div>
      <Control>
        <div onClick={handleDecrease}>-</div>
        <div>{qty}</div>
        <div onClick={handleIncrease}>+</div>
      </Control>
    </div>
  );
};

const Control = styled.div`
  display: inline-flex;
  /* justify-content: center; */
  align-items: center;
  border: 1px solid #d1d1d1;
  div {
    min-width: 30px;
    text-align: center;
  }
  div:first-child {
    border-right: 1px solid #d1d1d1;
    cursor: pointer;
  }
  div:nth-child(2) {
    /* border-top: 1px solid #d1d1d1;
    border-bottom: 1px solid #d1d1d1; */
    font-size: 0.875rem;
  }
  div:last-child {
    border-left: 1px solid #d1d1d1;
    cursor: pointer;
  }
`;

export default Counter;

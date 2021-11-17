import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

//import components
import Counter from "../Counter";

//icons
import { Close } from "../../assets/Icons";

//import redux

import { breakpoint, neutral, typeScale } from "../token";
import {
  decreaseQty,
  increaseQty,
  removeFromCart,
} from "../../redux/cartRedux";

const CartItem = ({ data }) => {
  // console.log(data);
  const dispatch = useDispatch();
  const handleIncrease = () => {
    dispatch(increaseQty(data));
  };

  const handleDecrease = () => {
    dispatch(decreaseQty(data));
  };

  const handleDelete = () => {
    dispatch(removeFromCart(data));
  };

  return (
    <Container>
      <Left>
        <div className="image">
          <img src={data.imgs && data.imgs[0].src} alt="" />
        </div>
      </Left>
      <Right>
        <div className="detail">
          <p className="main">{data.name}</p>
          <p className="price">{`$${data.price}`}</p>
        </div>
        <Counter
          qty={data.qty}
          handleIncrease={() => handleIncrease()}
          handleDecrease={() => handleDecrease()}
        />
        <div>{`$${data.price * data.qty}`}</div>
        <Delete onClick={handleDelete}>
          <Close width="18" height="18" color="#000" stroke="1" />
        </Delete>
      </Right>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid ${neutral[200]};
  padding: 1em 0;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
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
  flex: 5;
  margin-right: 2em;

  @media ${breakpoint.lg} {
    flex: 2;
    flex-direction: column;
  }
`;

const Delete = styled.div`
  cursor: pointer;
`;

export default CartItem;

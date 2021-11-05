import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

//import components
import Counter from "../Counter";

//icons
import { Close } from "../../assets/Icons";

//import redux
import { increase, decrease, deleteCartItem } from "../../reducers/cartReducer";
import { neutral, typeScale } from "../token";

const CartItem = ({ data }) => {
  const dispatch = useDispatch();
  const handleIncrease = () => {
    dispatch(increase(data));
  };

  const handleDecrease = () => {
    dispatch(decrease(data));
  };

  const handleDelete = () => {
    dispatch(deleteCartItem(data));
  };

  return (
    <Container>
      <Left>
        <div className="image">
          <img src={data.imgs && data.imgs[0].src} alt="" />
        </div>
        <div className="detail">
          <p className="main">{data.name}</p>
          <p className="price">{`${data.currency.label}${data.price}`}</p>
        </div>
      </Left>
      <Right>
        <Counter
          qty={data.qty}
          handleIncrease={() => handleIncrease()}
          handleDecrease={() => handleDecrease()}
        />
        <div>{`${data.currency.label}${data.price * data.qty}`}</div>
        <div onClick={handleDelete}>
          <Close width="18" height="18" color="#000" stroke="1" />
        </div>
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

export default CartItem;

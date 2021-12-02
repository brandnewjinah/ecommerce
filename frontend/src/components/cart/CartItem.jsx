import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

//import components
import Counter from "../Counter";

//icons
import { Close } from "../../assets/Icons";

//import redux
import { breakpoint, neutral, fontScale } from "../token";
import {
  decreaseQty,
  increaseQty,
  removeFromCart,
} from "../../redux/cartRedux";

const CartItem = ({ data }) => {
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
      <Image>
        <img src={data.img} alt="" />
      </Image>
      <Details>
        <Info>
          <p className="name">{data.name}</p>
          <p className="price">{`$${data.price}`}</p>
        </Info>
        <Right>
          <CounterContainer>
            <Counter
              qty={data.qty}
              handleIncrease={() => handleIncrease()}
              handleDecrease={() => handleDecrease()}
            />
          </CounterContainer>

          <Total>{`$${data.price * data.qty}`}</Total>
          <Delete onClick={handleDelete}>
            <Close width="18" height="18" color="#000" stroke="1" />
          </Delete>
        </Right>
      </Details>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid ${neutral[200]};
  padding: 1em 0;

  @media ${breakpoint.lg} {
  }
`;

const Image = styled.div`
  max-width: 60px;

  img {
    width: 100%;
    object-fit: cover;
  }
`;

const Details = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 1rem;

  @media ${breakpoint.lg} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Info = styled.div`
  flex: 1;

  .name {
    padding: 0.25rem 0 0.35rem;
    font-weight: 600;
  }

  .price {
    color: ${neutral[400]};
  }

  @media ${breakpoint.lg} {
    font-size: ${fontScale.sbody};

    .name {
      padding: 0;
    }

    .price {
      padding: 0.25rem 0 0.5rem;
    }
  }
`;

const Right = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;

  svg {
    display: flex;
    align-items: center;
  }
`;

const CounterContainer = styled.div``;

const Total = styled.div`
  @media ${breakpoint.lg} {
    display: none;
  }
`;

const Delete = styled.div`
  cursor: pointer;
`;

export default CartItem;

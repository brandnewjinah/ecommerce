import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

//import components
import Counter from "../../components/Counter";

//icons
import { Close } from "../../assets/Icon";

//import redux
import { breakpoint, neutral, fontSize } from "../../components/token";
import {
  decreaseQty,
  increaseQty,
  removeFromCart,
} from "../../redux/cartRedux";
import { Body } from "../../components/Text";

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
    <ListItem>
      <Preview>
        <img src={data.img} alt="" />
      </Preview>
      <Details>
        <ProductDetails>
          <Body>{data.name}</Body>
          <Body
            variant="body_small"
            color={neutral[400]}
          >{`$${data.price}`}</Body>
        </ProductDetails>
        <Actions>
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
        </Actions>
      </Details>
    </ListItem>
  );
};

const ListItem = styled.li`
  display: flex;
  gap: 1rem;
  width: 100%;
  border-bottom: 1px solid ${neutral[200]};
  padding: 1rem 0;
`;

const Preview = styled.div`
  flex: 1;
  position: relative;
  display: block;
  max-width: 100%;

  &:before {
    content: "";
    display: block;
    padding-bottom: 125%;
    width: 100%;
  }

  img {
    border: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    max-width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Details = styled.div`
  flex: 6;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media ${breakpoint.lg} {
    flex-direction: column;
    gap: 0.5rem;
    font-size: ${fontSize.sm1};
  }
`;

const ProductDetails = styled.div`
  flex: 1;

  p {
    padding: 0.15rem 0;
  }
`;

const Actions = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;

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

import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

//import components
import Counter from "../Counter";

//icons
import { Close } from "../../assets/Icon";

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
      <Thumbnail>
        <ImageContainer>
          <Image src={data.img} alt="" />
        </ImageContainer>
      </Thumbnail>

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

const Container = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  border-bottom: 1px solid ${neutral[200]};
  padding: 1rem 0;
`;

const Image = styled.img`
  position: absolute;
  width: 100%;
  top: 0px;
  left: 0px;
  object-fit: cover;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 125%;
  overflow: hidden;
`;

const Thumbnail = styled.div`
  position: relative;
  flex: 1;
`;

const Details = styled.div`
  flex: 5;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${breakpoint.lg} {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
    font-size: ${fontScale.scale_s2};
  }
`;

const Info = styled.div`
  flex: 1;

  p {
    padding: 0.15rem 0;
  }

  .name {
    font-weight: 600;
  }

  .price {
    color: ${neutral[400]};
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

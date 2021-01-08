import React from "react";

//import components
import Counter from "../../components/Counter";

//import styles and assets
import styled from "styled-components";
import { Close } from "../../assets/Icons";
import colors from "../../components/Colors";

//import redux
import { connect } from "react-redux";
import { increase, decrease, deleteCartItem } from "../../reducers/cartReducer";

const CartItem = (props) => {
  const handleIncrease = () => {
    props.increase(props.data);
  };

  const handleDecrease = () => {
    props.decrease(props.data);
  };

  const handleDelete = () => {
    props.deleteCartItem(props.data);
  };

  return (
    <Wrapper>
      <Detail>
        <div className="image">
          <img src={props.data.img && props.data.img.src} alt="" />
        </div>
        <div className="detail">
          <p>{props.data.name}</p>
          <p className="price">{`${props.data.currency.label}${props.data.price}`}</p>
        </div>
      </Detail>
      <Calc>
        <Counter
          qty={props.data.qty}
          handleIncrease={() => handleIncrease()}
          handleDecrease={() => handleDecrease()}
        />
        <div>{`${props.data.currency.label}${
          props.data.price * props.data.qty
        }`}</div>
        <Flex onClick={handleDelete}>
          <Close width="18" height="18" color="#000" stroke="1" />
        </Flex>
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

export default connect(null, { increase, decrease, deleteCartItem })(CartItem);

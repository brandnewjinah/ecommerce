import React, { FC } from "react";
import { Close } from "../../assets/Icon";
import { Div, Flex } from "../../components/containers/Div";
import Counter from "../../components/Counter";
import ImageContainer from "../../components/ImageContainer";
import { ListItem } from "../../components/ListItem";
import { Body } from "../../components/Text";

interface Props {
  data?: any;
}

const CartItem: FC<Props> = ({ data }) => {
  const handleIncrease = () => {
    // dispatch(increaseQty(data));
  };
  const handleDecrease = () => {
    // dispatch(decreaseQty(data));
  };

  const handleDelete = () => {
    // dispatch(removeFromCart(data));
  };

  return (
    <ListItem flex gap="1rem" alignItems="start">
      <ImageContainer imgUrl={data.img} />
      <Flex className="flexSix">
        <Div className="flexOne">
          <Body>{data.name}</Body>
          <Body variant="body_small">{`$${data.price}`}</Body>
        </Div>
        <Flex className="flexOne">
          <Counter
            qty={data.qty}
            handleIncrease={() => handleIncrease()}
            handleDecrease={() => handleDecrease()}
          />
          <Body variant="body_small">{`$${data.price * data.qty}`}</Body>
          <Close width={18} height={18} color="#000" stroke={1} />
        </Flex>
      </Flex>
    </ListItem>
  );
};

export default CartItem;

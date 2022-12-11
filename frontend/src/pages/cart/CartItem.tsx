import React, { FC } from "react";

//comp
import { Div, Flex } from "../../components/containers/Div";
import Counter from "../../components/Counter";
import ImageContainer from "../../components/ImageContainer";
import { ListItem } from "../../components/ListItem";
import { Body } from "../../components/Text";
import { Close } from "../../assets/Icon";

//redux
import { useDispatch } from "react-redux";
import { decreaseQty, increaseQty, removeFromCart } from "../../redux/cart";

interface Props {
  data?: any;
}

const CartItem: FC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    // dispatch(removeFromCart(data));
  };

  return (
    <ListItem flex gap="1rem" alignItems="start" borderBottom padding=".5rem 0">
      <ImageContainer imgUrl={data.img} />
      <Flex className="flexSix">
        <Body className="flexOne">{data.name}</Body>
        <Flex className="flexOne">
          <Counter
            qty={data.qty}
            handleIncrease={() => dispatch(increaseQty(data))}
            handleDecrease={() => dispatch(decreaseQty(data))}
          />
          <Body variant="body_small">{`$${data.price}`}</Body>
          <Div pointer handleClick={() => dispatch(removeFromCart(data))}>
            <Close width={18} height={18} color="#000" stroke={1} />
          </Div>
        </Flex>
      </Flex>
    </ListItem>
  );
};

export default CartItem;

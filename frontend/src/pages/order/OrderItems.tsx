import React, { FC } from "react";

//comp
import { Close } from "../../assets/Icon";
import { Div, Flex } from "../../components/containers/Div";
import Counter from "../../components/Counter";
import ImageContainer from "../../components/ImageContainer";
import { ListItem } from "../../components/ListItem";
import { Body } from "../../components/Text";

//redux
import { useDispatch } from "react-redux";
import {
  decreaseQty,
  increaseQty,
  removeFromCart,
} from "../../redux/cartRedux";

interface Props {
  data?: any;
}

const CartItem: FC<Props> = ({ data }) => {
  console.log(data);
  const dispatch = useDispatch();

  return (
    <ListItem flex gap="1rem" alignItems="start" borderBottom padding=".5rem 0">
      <ImageContainer imgUrl={data.img} />
      <Flex className="flexEight">
        <Div className="flexThree">
          <Body variant="body_xsmall">{data.brand}</Body>
          <Body>{data.name}</Body>
        </Div>
        <Div className="flexOne">
          <Body variant="body_small">{`$${data.price}`}</Body>
          <Body variant="body_small">{`qty ${data.qty}`}</Body>
        </Div>
      </Flex>
    </ListItem>
  );
};

export default CartItem;

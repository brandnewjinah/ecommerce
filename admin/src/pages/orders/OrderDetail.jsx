import React, { useEffect } from "react";
import { useParams } from "react-router";
import moment from "moment";

//comp
import { Div, FlexDiv } from "../../components/containers/Divs";
import Heading from "../../components/Heading";
import { Section } from "../../components/containers/Sections";
import { Card } from "../../components/Card";
import Text from "../../components/Text";
import OrderItem from "../../components/OrderItem";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetail } from "../../redux/orderDetailRedux";
import { getOneUser } from "../../redux/userRedux";

const OrderDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { order } = useSelector((state) => state.orderDetail);

  useEffect(() => {
    dispatch(getOrderDetail({ id, userId: order.user }));
  }, [dispatch, id]);

  const userDetail = useSelector((state) => state.users.userDetail);

  useEffect(() => {
    dispatch(getOneUser(order.user));
  }, [dispatch, order.user]);

  return (
    <Div>
      <Heading title="Order" />
      <Section margin="1rem 0">
        <Card margin="1rem 0" padding="1.5rem">
          <Text variant="h6" padding="0 0 .25rem">
            Order Number
          </Text>
          <Text>{order._id}</Text>
        </Card>
        <Card margin="1rem 0" padding="1.5rem">
          <FlexDiv justifyContent="sb">
            <Div>
              <Text variant="h6" padding="0 0 .25rem">
                Order Date
              </Text>
              <Text>{moment(order.createdAt).format("lll")}</Text>
            </Div>
            <Div>
              <Text variant="h6" padding="0 0 .25rem">
                Order Status
              </Text>
              <Text>{order.status}</Text>
            </Div>
          </FlexDiv>
        </Card>
        <Card margin="1rem 0" padding="1.5rem">
          <Text variant="h6" padding="0 0 1rem">
            Order Details
          </Text>
          {order &&
            order.orderItems &&
            order.orderItems.length !== 0 &&
            order.orderItems.map((item, idx) => (
              <OrderItem key={idx} item={item} />
            ))}
        </Card>
        <Card margin="1rem 0" padding="1.5rem">
          <FlexDiv justifyContent="sb">
            <Div>
              <Text variant="h6" padding="0 0 .25rem">
                User
              </Text>
              <Text>{userDetail.name}</Text>
              <Text>{userDetail.email}</Text>
            </Div>
            <Div>
              <Text variant="h6" padding="0 0 .25rem">
                Shipping
              </Text>
              <Text>
                {order &&
                  order.shipping &&
                  Object.keys(order.shipping).length !== 0 &&
                  order.shipping.address1}
              </Text>
              <Text>
                {`${
                  order &&
                  order.shipping &&
                  Object.keys(order.shipping).length !== 0 &&
                  order.shipping.city
                } ${
                  order &&
                  order.shipping &&
                  Object.keys(order.shipping).length !== 0 &&
                  order.shipping.state
                } ${
                  order &&
                  order.shipping &&
                  Object.keys(order.shipping).length !== 0 &&
                  order.shipping.zip
                }`}
              </Text>
            </Div>
            <Div>
              <Text variant="h6" padding="0 0 .25rem">
                Payment
              </Text>
              <Text>
                {`${
                  order &&
                  order.payment &&
                  Object.keys(order.payment).length !== 0 &&
                  order.payment.billingFirstName
                } ${
                  order &&
                  order.payment &&
                  Object.keys(order.payment).length !== 0 &&
                  order.payment.billingLastName
                }`}
              </Text>
              <Text>
                {`Card ending in ${
                  order &&
                  order.payment &&
                  Object.keys(order.payment).length !== 0 &&
                  order.payment.cardNumber
                }`}
              </Text>
            </Div>
          </FlexDiv>
        </Card>
      </Section>
    </Div>
  );
};

export default OrderDetail;

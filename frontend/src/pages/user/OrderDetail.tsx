import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";

//comp
import Layout from "../../layout/sub/Layout";
import { Div, Flex } from "../../components/containers/Div";
import { HeaderSmall } from "../../components/Header";
import { Section } from "../../components/containers/Section";
import { Body } from "../../components/Text";
import OrderItem from "../order/OrderItems";
import { neutral } from "../../components/token";

//redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getOneOrderDetail } from "../../redux/orderRedux";
import Hr from "../../components/Hr";

const OrderDetail = () => {
  const dispatch = useDispatch();
  const { orderId } = useParams<{ orderId: string }>();

  useEffect(() => {
    dispatch(getOneOrderDetail(orderId!));
  }, [dispatch, orderId]);

  const { isLoading, order } = useSelector((state: RootState) => state.order);

  return (
    <Layout>
      <Div width="85%">
        <HeaderSmall title="Order Details" margin="0 0 2rem 0" />
        <Section bgColor={neutral[50]} padding="2rem" margin="0 0 1rem 0">
          <Flex>
            <div className="flexTwo">
              <Body
                variant="caption"
                color={neutral[500]}
                uppercase
                spacing=".05rem"
              >
                Order Number
              </Body>
              <Body variant="body_small">{order.orderDetails._id}</Body>
            </div>
            <div className="flexTwo">
              <Body
                variant="caption"
                color={neutral[500]}
                uppercase
                spacing=".05rem"
              >
                Order Date
              </Body>
              <Body variant="body_small">
                {moment(order.orderDetails.createdAt).format("LLL")}
              </Body>
            </div>
          </Flex>
        </Section>
        <Section bgColor={neutral[50]} padding="2rem" margin="0 0 1rem 0">
          <Body
            variant="caption"
            color={neutral[500]}
            uppercase
            spacing=".05rem"
          >
            Order Summary
          </Body>
          {order &&
            order.orderDetails &&
            order.orderDetails.orderItems.map((item, idx) => (
              <OrderItem key={idx} data={item} />
            ))}
        </Section>
        <Section bgColor={neutral[50]} padding="2rem" margin="0 0 1rem 0">
          <Flex alignItems="flex-start">
            <Div className="flexOne">
              <Body
                variant="caption"
                color={neutral[500]}
                uppercase
                spacing=".05rem"
              >
                Shipping Address
              </Body>
              <Body variant="body_small">
                {order.orderDetails.shipping.fullName}
              </Body>
              <Body variant="body_small">
                {order.orderDetails.shipping.streetAddress}
              </Body>
              <Body variant="body_small">{`${order.orderDetails.shipping.city} ${order.orderDetails.shipping.state} ${order.orderDetails.shipping.zip}`}</Body>
            </Div>
            <Div className="flexOne">
              <Body
                variant="caption"
                color={neutral[500]}
                uppercase
                spacing=".05rem"
              >
                Shipping Method
              </Body>
              <Body variant="body_small">
                {order.orderDetails.delivery.shipping}
              </Body>
            </Div>
          </Flex>
        </Section>

        <Section bgColor={neutral[50]} padding="2rem">
          <Flex alignItems="flex-start">
            <Div className="flexOne">
              <Body
                variant="caption"
                color={neutral[500]}
                uppercase
                spacing=".05rem"
              >
                Payment Method
              </Body>
              <Body variant="body_small">
                {order.orderDetails.payment.cardNumber}
              </Body>
            </Div>
            <Div className="flexTwo">
              <Body
                variant="caption"
                color={neutral[500]}
                uppercase
                spacing=".05rem"
              >
                Payment Summary
              </Body>
              <div>
                {order.orderDetails.orderItems.map((item, idx) => (
                  <Flex key={idx}>
                    <Body variant="body_small">{item.name}</Body>
                    <Body variant="body_small">{`${
                      Number(item.price) * item.qty!
                    }`}</Body>
                  </Flex>
                ))}
                <Hr />
                <Body variant="body_small">subtotal to come from server</Body>
                <Body variant="body_small">tax to come from server</Body>
                <Body variant="body_small">shipping to come from server</Body>
                <Body variant="body_small">total to come from server</Body>
              </div>
            </Div>
          </Flex>
        </Section>
      </Div>
    </Layout>
  );
};

export default OrderDetail;

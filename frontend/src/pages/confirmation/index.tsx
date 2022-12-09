import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

//comp
import Loading from "../../components/Loading";
import { HeaderSmall } from "../../components/Header";
import { Section } from "../../components/containers/Section";
import OrderItem from "../order/OrderItems";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getOneOrderDetail } from "../../redux/orderRedux";
import { RootState } from "../../redux/store";
import { Body } from "../../components/Text";
import { Flex, Div } from "../../components/containers/Div";

const OrderConfirmation = () => {
  const dispatch = useDispatch();
  const { orderId } = useParams<{ orderId: string }>();

  useEffect(() => {
    dispatch(getOneOrderDetail(orderId!));
  }, [dispatch, orderId]);

  const { isLoading, status, orderDetails } = useSelector(
    (state: RootState) => state.order
  );

  return isLoading ? (
    <Loading />
  ) : (
    <>
      {status === 200 ? (
        <>
          <HeaderSmall
            title="THANK YOU FOR YOUR ORDER"
            body={`Your Order Number is ${orderId} and status is ${orderDetails.orderStatus}`}
          />
          <Section>
            <Body>Order Summary</Body>
            {orderDetails &&
              orderDetails.orderItems.map((item, idx) => (
                <OrderItem key={idx} data={item} />
              ))}
          </Section>
          <Section>
            <Body>Shipping</Body>
            <Flex>
              <Div className="flexOne">
                <Body>{orderDetails.shipping.fullName}</Body>
                <Body>{orderDetails.shipping.streetAddress}</Body>
                <Body>{`${orderDetails.shipping.city} ${orderDetails.shipping.state} ${orderDetails.shipping.zip}`}</Body>
              </Div>
              <Div className="flexOne">
                <Body>{orderDetails.delivery.shipping}</Body>
              </Div>
            </Flex>
          </Section>
          <Section>
            <Body>Billing</Body>
            <Flex>
              <Div>
                <Body>Payment Method</Body>
                <Body>{orderDetails.payment.cardNumber}</Body>
              </Div>
              <Div>
                <Body>Billing Summary</Body>
                <div>
                  {orderDetails.orderItems.map((item, idx) => (
                    <Flex key={idx}>
                      <Body>{item.name}</Body>
                      <Body>{`${Number(item.price) * item.qty!}`}</Body>
                    </Flex>
                  ))}
                  <Body>subtotal to come from server</Body>
                  <Body>tax to come from server</Body>
                  <Body>shipping to come from server</Body>
                  <Body>total to come from server</Body>
                </div>
              </Div>
            </Flex>
          </Section>
        </>
      ) : (
        <>error</>
      )}
    </>
  );
};

export default OrderConfirmation;

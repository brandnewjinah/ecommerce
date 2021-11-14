import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

//import components
import { Container, HeaderContainer } from "../components/layout/Containers";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetail } from "../redux/orderDetailRedux";
import OrderItem from "../components/order/OrderItem";

const OrderConfirmation = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const orderDetail = useSelector((state) => state.orderDetail);
  const { order, loading, error } = orderDetail;

  useEffect(() => {
    dispatch(getOrderDetail(id));
  }, [dispatch, id]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage>{`${error} this is error message component`}</ErrorMessage>
      ) : (
        <Container>
          <HeaderContainer title="THANK YOU" body={`order# ${order._id}`} />
          <Details>
            <Article>
              <p>Shipping Address</p>
              <p>{order && order.shipping && order.shipping.address1}</p>
              <p>
                {order && order.shipping && order.shipping.city},{" "}
                {order && order.shipping && order.shipping.state}{" "}
                {order && order.shipping && order.shipping.zip}
              </p>
            </Article>
            <Article>
              <p>Delivery Method</p>
              <p>{order && order.shipping && order.shipping.shipping}</p>
            </Article>
            <Article>
              <p>Payment Method</p>
              <p>****{order && order.billing && order.billing.cardNumber}</p>
            </Article>
          </Details>
          <Items>
            <h6>Summary</h6>
            {order.orderItems &&
              order.orderItems.length > 0 &&
              order.orderItems.map((item, idx) => <OrderItem item={item} />)}
          </Items>
        </Container>
      )}
    </>
  );
};

const Details = styled.section`
  display: flex;
  width: 100%;
  padding: 2em 0;

  p {
    line-height: 1.25rem;
  }
`;

const Article = styled.article`
  flex: 1;
`;

const Items = styled.section`
  flex: 1;
`;

const Item = styled.section``;

export default OrderConfirmation;

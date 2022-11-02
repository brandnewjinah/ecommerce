import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

//import components;
import Layout from "../layout/sub/Layout";
import { HeaderSmall } from "../layout/Header";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { ChevronLeft } from "../assets/Icon";
import OrderItem from "../components/order/OrderItem";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetail } from "../redux/orderDetailRedux";

const OrderConfirmation = () => {
  let { id } = useParams();

  const dispatch = useDispatch();
  const orderDetail = useSelector((state) => state.orderDetail);
  const { order, loading, error } = orderDetail;

  useEffect(() => {
    dispatch(getOrderDetail(id));
  }, [dispatch, id]);

  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage>{`${error} this is error message component`}</ErrorMessage>
      ) : (
        <>
          <ChevronLeft width={20} height={20} color="#000" stroke={2} />
          <HeaderSmall title="THANK YOU" body={`order# ${order._id}`} />
          <Details>
            <Article>
              <h5>Order Status</h5>
              <p>{order.status}</p>
            </Article>
            <Article>
              <h5>Delivery Method</h5>
              <p>{order && order.delivery && order.delivery.shipping}</p>
            </Article>
            <Article>
              <h5>Shipping Address</h5>
              <p>{order && order.shipping && order.shipping.address1}</p>
              <p>
                {order && order.shipping && order.shipping.city},{" "}
                {order && order.shipping && order.shipping.state}{" "}
                {order && order.shipping && order.shipping.zip}
              </p>
            </Article>

            <Article>
              <h5>Payment Method</h5>
              <p>****{order && order.billing && order.billing.cardNumber}</p>
            </Article>
          </Details>
          <Items>
            <h5>Summary</h5>
            {order.orderItems &&
              order.orderItems.length > 0 &&
              order.orderItems.map((item, idx) => <OrderItem item={item} />)}
          </Items>
        </>
      )}
    </Layout>
  );
};

const Details = styled.section`
  width: 100%;
  padding: 2rem 0;

  h5 {
    text-transform: uppercase;
    padding: 1rem 0;
  }

  p {
    line-height: 1.25rem;
  }
`;

const Article = styled.article`
  padding: 1rem 0;
`;

const Items = styled.section`
  h5 {
    text-transform: uppercase;
    padding: 1rem 0;
  }
`;

const Item = styled.section``;

export default OrderConfirmation;

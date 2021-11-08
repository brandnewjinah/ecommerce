import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

//import components
import OrderItem from "./order/OrderItem";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

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
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage>{`${error} this is error message component`}</ErrorMessage>
      ) : (
        <Wrapper>
          <Header>
            <h4>THANK YOU</h4>
            <p>
              We are getting started on your order right away, and you will
              receive order confirmation email shortly.
            </p>
          </Header>
          <Details>
            <h6>Order Details - #{order._id}</h6>
            <div className="flex">
              <div className="three">
                <p>Shipping Address</p>
                <p>{order && order.shipping && order.shipping.address1}</p>
                <p>
                  {order && order.shipping && order.shipping.city},{" "}
                  {order && order.shipping && order.shipping.state}{" "}
                  {order && order.shipping && order.shipping.zip}
                </p>
              </div>
              <div className="three">
                <p>Delivery Method</p>
                <p>{order && order.shipping && order.shipping.shipping}</p>
              </div>
              <div className="three">
                <p>Payment Method</p>
                <p>****{order && order.billing && order.billing.cardNumber}</p>
              </div>
            </div>
          </Details>
          {/* <Summary>
            <h6>Summary</h6>
            {order.orderItems &&
              order.orderItems.length > 0 &&
              order.orderItems.map((item, idx) => <OrderItem order={item} />)}
          </Summary> */}
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 2em;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  p {
    width: 50%;
    line-height: 1.25rem;
  }
`;

const Details = styled.main`
  width: 100%;
  padding: 2em 0;

  p {
    line-height: 1.25rem;
  }

  .flex {
    display: flex;
  }

  .three {
    flex: 0 1 33.3%;
  }
`;

const Summary = styled.div`
  padding: 2em 0;
`;

export default OrderConfirmation;

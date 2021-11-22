import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import styled from "styled-components";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetail } from "../../redux/orderDetailRedux";
import { typeScale } from "../../components/token";

const OrderDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderDetail(id));
  }, [dispatch]);

  const { order } = useSelector((state) => state.orderDetail);

  console.log(order);
  return (
    <Container>
      <Header>
        <h3>ORDERS</h3>
      </Header>
      <Section>
        <h5>Order Number</h5>
        <p>{order._id}</p>
      </Section>
      <Section>
        <h5>Order Status</h5>
        <p>{order.status}</p>
      </Section>
      <Section>
        <h5>Ordered Date</h5>
        <p>{moment(order.createdAt).format("lll")}</p>
      </Section>
      <Section>
        <h5>Shipping</h5>
        <p>{order.shipping.address1}</p>
        <p>{order.shipping.city}</p>
      </Section>
      <Section></Section>
    </Container>
  );
};

const Container = styled.div``;

const Header = styled.div`
  padding: 0 0 1.5rem;
`;

const Section = styled.section`
  h5 {
    font-weight: 700;
    text-transform: uppercase;
  }

  p {
    font-size: ${typeScale.sbody};
  }
`;

export default OrderDetail;

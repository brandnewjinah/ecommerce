import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import styled from "styled-components";

//components
import { Section } from "../../components/containers/Sections";
import OrderItem from "../../components/OrderItem";
import { Flex } from "../../components/containers/Sections";
import { Card } from "../../components/Card";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetail } from "../../redux/orderDetailRedux";
import { getOneUser } from "../../redux/userRedux";
import Heading from "../../components/Heading";

const OrderDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderDetail(id));
    //dispatch product details
  }, [dispatch]);

  const { order } = useSelector((state) => state.orderDetail);

  useEffect(() => {
    dispatch(getOneUser(order.user));
  }, [dispatch]);

  const userDetail = useSelector((state) => state.users.userDetail);

  return (
    <Container>
      <Heading title="Order" />
      <Section margin="1rem 0">
        <Card margin="1rem 0" padding="1.5rem">
          <h5>Order Number</h5>
          <p>{order._id}</p>
        </Card>
        <Card margin="1rem 0" padding="1.5rem">
          <Flex justifyContent="sb">
            <Article>
              <h5>Ordered Date</h5>
              <p>{moment(order.createdAt).format("lll")}</p>
            </Article>
            <Article>
              <h5>Order Status</h5>
              <p>{order.status}</p>
            </Article>
          </Flex>
        </Card>
        <Card margin="1rem 0" padding="1.5rem">
          <h5>Order Details</h5>
          <p>
            {order &&
              order.orderItems &&
              order.orderItems.length !== 0 &&
              order.orderItems.map((item) => (
                // <p>{item.name}</p>
                <OrderItem item={item} />
              ))}
          </p>
        </Card>
        <Card margin="1rem 0" padding="1.5rem">
          <Flex justifyContent="sb">
            <Article>
              <h5>User</h5>
              <p>{userDetail.name}</p>
              <p>{userDetail.email}</p>
            </Article>
            <Article>
              <h5>Shipping</h5>
              <p>{order.shipping.address1}</p>
              <p>{order.shipping.city}</p>
            </Article>
            <Article>
              <h5>Payment</h5>
              <p>{order.shipping.address1}</p>
              <p>{order.shipping.city}</p>
            </Article>
          </Flex>
        </Card>
      </Section>
    </Container>
  );
};

const Container = styled.div``;

// const Section = styled.section`
//   width: 100%;
//   padding: 2rem 0;

//   h5 {
//     text-transform: uppercase;
//     padding: 1rem 0;
//   }

//   p {
//     line-height: 1.25rem;
//   }
// `;

const Article = styled.article`
  padding: 1rem 0;
`;

export default OrderDetail;

import React, { useEffect } from "react";

import styled from "styled-components";

//components
import Layout from "../layout/sub/Layout";
import { HeaderSmall } from "../layout/Header";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import Card from "../components/order/Card";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../redux/orderDetailRedux";

const User = () => {
  const auth = useSelector((state) => state.auth);
  const { currentUser } = auth;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOrders(currentUser._id));
  }, [dispatch, currentUser._id]);

  const orderDetail = useSelector((state) => state.orderDetail);
  const { loading, orders, error } = orderDetail;

  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage>{`${error} this is error message component`}</ErrorMessage>
      ) : (
        <>
          <HeaderSmall title="Order History" />
          {orders && orders.length > 0 ? (
            <Wrapper>
              {orders.map((order, idx) => (
                <Card order={order} />
              ))}
            </Wrapper>
          ) : (
            <Wrapper>no orders</Wrapper>
          )}
        </>
      )}
    </Layout>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem 0;
`;

export default User;

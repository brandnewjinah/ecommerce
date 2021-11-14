import React, { useEffect } from "react";
import styled from "styled-components";

//components
import { Container, HeaderContainer } from "../components/layout/Containers";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import Card from "../components/order/Card";

//token
import { breakpoint } from "../components/token";

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
    <Container>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage>{`${error} this is error message component`}</ErrorMessage>
      ) : (
        <>
          <HeaderContainer title="Order History" />
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
    </Container>
  );
};

const Wrapper = styled.div``;

export default User;

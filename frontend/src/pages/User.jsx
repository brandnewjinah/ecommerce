import React, { useEffect } from "react";
import styled from "styled-components";

//components
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

//token
import { breakpoint } from "../components/token";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../redux/orderDetailRedux";

const User = () => {
  const userOrders = useSelector((state) => state.orderDetail.orders);
  const { loading, error, orders } = userOrders;
  const auth = useSelector((state) => state.auth);
  const { currentUser } = auth;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOrders(currentUser._id));
  }, [dispatch]);

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage>{`${error} this is error message component`}</ErrorMessage>
      ) : (
        <>
          <Header>
            <h3>User Profile</h3>
          </Header>
          <Wrapper>
            {userOrders.map((order, idx) => (
              <>
                <div key={order._id}>{order._id}</div>
                <div>{order.createdAt}</div>
              </>
            ))}
          </Wrapper>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  flex-direction: column;
  max-width: 90rem;
  padding: 0 1.5rem;
  margin: 4rem auto;

  @media ${breakpoint.m} {
    margin: 3rem auto;
  }
`;

const Header = styled.div`
  h3 {
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.05rem;
  }
`;

const Wrapper = styled.div``;

export default User;

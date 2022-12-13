import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

//comp
import Layout from "../../layout/sub/Layout";
import { HeaderSmall } from "../../components/Header";
import { Section } from "../../components/containers/Section";
import { TextInput } from "../../components/TextInput";
import { primaryColor } from "../../components/token";

//redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Div } from "../../components/containers/Div";
import { getUserOrders } from "../../redux/orderRedux";
import OrderCard from "../../components/order/OrderCard";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(getUserOrders(currentUser._id!));
  }, [dispatch, currentUser._id]);

  const { userOrders } = useSelector((state: RootState) => state.order);

  return (
    <Layout>
      <Div width="85%">
        <HeaderSmall title="Order History" margin="0 0 2rem 0" />
        {userOrders &&
          userOrders.orders &&
          userOrders.orders.map((order, idx) => (
            <OrderCard
              key={idx}
              id={order._id}
              date={order.createdAt}
              status={order.orderStatus}
              total={order.total}
              thumb={order.orderItems[0].img}
            />
          ))}
      </Div>
    </Layout>
  );
};

export default OrderHistory;

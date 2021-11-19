import React, { useEffect, useState } from "react";
import styled from "styled-components";

//components
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";
import { Card } from "../../components/Card";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../redux/orderRedux";

const thead = [
  { id: "name", name: "Name", sort: true, width: "25%" },
  { id: "createdAt", name: "Date", sort: true, width: "25%" },
  { id: "total", name: "Total", sort: true, width: "25%" },
  { id: "status", name: "Status", sort: true, width: "25%" },
];

const OrderList = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch, currentPage]);

  const orderList = useSelector((state) => state.orders.orders);
  const { pages, data } = orderList;

  const orders = data.map((item) => ({
    name: item.shipping.firstName,
    createdAt: item.createdAt,
    total: item.total,
    status: item.status,
    id: item._id,
  }));

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Container>
      <Header>
        <h3>ORDERS</h3>
      </Header>
      <Card>
        <Table thead={thead} tbody={orders} linkurl="users" />
        <Pagination
          pageCount={pages}
          currentPage={currentPage}
          handlePageChange={(page) => handlePageChange(page)}
        />
      </Card>
    </Container>
  );
};

const Container = styled.div``;

const Header = styled.div`
  padding: 0 0 1.5rem;
`;

export default OrderList;

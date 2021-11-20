import React, { useEffect, useState } from "react";
import styled from "styled-components";

//components
import { Card } from "../../components/Card";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";

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
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders({ page: currentPage }));
  }, [dispatch, currentPage]);

  const { pages, data } = useSelector((state) => state.orders.orders);

  const orders =
    data &&
    data.map((item) => ({
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
      </Card>
      <Pagination
        pageCount={pages}
        currentPage={currentPage}
        handlePageChange={(page) => handlePageChange(page)}
      />
    </Container>
  );
};

const Container = styled.div``;

const Header = styled.div`
  padding: 0 0 1.5rem;
`;

export default OrderList;

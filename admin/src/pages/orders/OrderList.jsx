import React, { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";

//components
import { Card } from "../../components/Card";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../redux/orderRedux";
import Heading from "../../components/Heading";

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
      name: item.shipping.fullName,
      createdAt: moment(item.createdAt).format("lll"),
      total: `$${item.total}`,
      status: item.status,
      id: item._id,
    }));

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Container>
      <Heading title="Orders" />

      <Card margin="1rem 0">
        <Table thead={thead} tbody={orders} linkurl="orders" />
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

export default OrderList;

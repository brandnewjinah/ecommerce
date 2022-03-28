import React, { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";

//components
import { Card } from "../components/Card";
import Table from "../components/Table";
import Pagination from "../components/Pagination";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getAllSubscribers } from "../redux/subscriberRedux";
import Heading from "../components/Heading";

const thead = [
  { id: "email", name: "Email", sort: true, width: "45%" },
  { id: "createdAt", name: "Subscribed", sort: true, width: "45%" },
];

const SubscribersList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSubscribers({ page: currentPage }));
  }, [dispatch, currentPage]);

  const { pages, data } = useSelector((state) => state.subscribers.subscribers);

  const users =
    data &&
    data.map((item) => ({
      email: item.email,
      createdAt: moment(item.createdAt).format("lll"),
      id: item._id,
    }));

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Container>
      <Heading title="Subscribers" />

      <Card margin="1rem 0">
        <Table thead={thead} tbody={users} />
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

export default SubscribersList;

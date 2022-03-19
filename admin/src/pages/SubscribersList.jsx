import React, { useEffect, useState } from "react";
import styled from "styled-components";

//components
import { Card } from "../components/Card";
import Table from "../components/Table";
import Pagination from "../components/Pagination";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getAllSubscribers } from "../redux/subscriberRedux";

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
      createdAt: item.createdAt,
      id: item._id,
    }));

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Container>
      <Header>
        <h3>SUBSCRIBERS</h3>
      </Header>
      <Card>
        <Table thead={thead} tbody={users} linkurl="users" />
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

export default SubscribersList;

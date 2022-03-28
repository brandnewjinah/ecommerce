import React, { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";

//components
import { Card } from "../../components/Card";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/userRedux";
import Heading from "../../components/Heading";

const thead = [
  { id: "name", name: "Name", sort: true, width: "30%" },
  { id: "email", name: "Email", sort: true, width: "40%" },
  { id: "createdAt", name: "Joined", sort: true, width: "30%" },
];

const CustomerList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers({ page: currentPage }));
  }, [dispatch, currentPage]);

  const { pages, data } = useSelector((state) => state.users.users);

  const users =
    data &&
    data.map((item) => ({
      name: item.name,
      email: item.email,
      createdAt: moment(item.createdAt).format("lll"),
      id: item._id,
    }));

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Container>
      <Heading title="Customers" />
      <Card margin="1rem 0">
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

export default CustomerList;

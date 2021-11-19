import React, { useEffect, useState } from "react";
import styled from "styled-components";

//components
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";
import { Card } from "../../components/Card";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/userRedux";

const thead = [
  { id: "name", name: "Name", sort: true, width: "30%" },
  { id: "email", name: "Email", sort: true, width: "40%" },
  { id: "createdAt", name: "Joined", sort: true, width: "30%" },
];

const ProductList = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const userList = useSelector((state) => state.users.users);
  const { pages, data } = userList;

  const users = data.map((item) => ({
    name: item.name,
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
        <h3>CUSTOMERS</h3>
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

export default ProductList;

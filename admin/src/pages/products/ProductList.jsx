import React, { useEffect, useState } from "react";
import styled from "styled-components";

//components
import { Card } from "../../components/Card";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/productRedux";

const thead = [
  { id: "sku", name: "SKU", sort: true, width: "7.5%" },
  { id: "name", name: "Name", sort: true, width: "28%" },
  { id: "price", name: "Price", sort: true, width: "9%" },
  { id: "brand", name: "Brand", sort: true, width: "14%" },
  { id: "main", name: "Main Category", sort: true, width: "15%" },
  { id: "sub", name: "Sub Category", sort: true, width: "15%" },
  { id: "action", name: "Action", sort: false, width: "6.5%" },
];

const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts({ category: "all", page: currentPage }));
  }, [dispatch, currentPage]);

  const productList = useSelector((state) => state.productList.products);
  const { pages, data } = productList;

  const products = data.map((item) => ({
    sku: item.sku,
    name: item.name,
    price: item.price,
    brand: item.brand,
    main: item.category1.value,
    sub: item.category2.value,
    id: item._id,
  }));

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Container>
      <Header>
        <h3>PRODUCTS</h3>
      </Header>
      <Card>
        <Table
          thead={thead}
          tbody={products}
          checkbox
          action="delete"
          linkurl="products/edit"
        />
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

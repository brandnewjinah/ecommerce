import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router";

//redux
import Breadcrumbs from "../../components/Breadcrumbs";
import { Div, Flex } from "../../components/containers/Div";
import { Section } from "../../components/containers/Section";
import Filter from "../../components/Filter";
import { Header } from "../../components/Header";

import { TextInput } from "../../components/TextInput";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getProducts, searchProducts } from "../../redux/productReducer";
import { RootState } from "../../redux/store";
import FlexTable from "../../components/FlexTable";
import Pagination from "../../components/Pagination";

//test data
import { orderData } from "../../data/testData";

const List = () => {
  const dispatch = useDispatch();
  const { category } = useParams();
  const [sort, setSort] = useState("new");
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  // useEffect(() => {
  //   dispatch(getProducts({ category, sort, page: currentPage }));
  // }, [dispatch, category, sort, currentPage]);

  // const { products } = useSelector((state: RootState) => state.products);

  const tableKey = [
    {
      name: "Customer ID",
      width: "flexOne",
    },
    {
      name: "Email",
      width: "flexOne",
    },
    {
      name: "Name",
      width: "flexOne",
    },
    {
      name: "Date Joined",
      width: "flexOne",
    },
  ];

  const tableData =
    orderData &&
    orderData.map((item) => {
      return [
        { value: `...${item._id.slice(-7)}`, width: "flexOne" },
        { value: item.createdAt, width: "flexOne" },
        { value: `...${item.user.slice(-7)}`, width: "flexOne" },
        { value: item.orderItems.length, width: "flexOne" },
      ];
    });

  const filterData = ["all", "completed", "cancelled"];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(searchProducts(search));
  };

  return (
    <div>
      <Div margin="0 0 1rem 0">
        <Header title="Subscribers List" textAlign="left" />
        <Breadcrumbs
          category1={{ title: "Home", link: "/home" }}
          category2="Subscribers List"
        />
      </Div>

      <Section bgColor="#fff" padding="1.25rem">
        <Flex justifyContent="space-between" margin="0 0 2rem">
          <Filter data={filterData} category={category} className="flexOne" />
          <Div className="flexOne">
            <form onSubmit={handleSearchSubmit}>
              <TextInput
                placeholder="Search by customer ID or name"
                type="search"
                value={search}
                onChange={handleInputChange}
              />
            </form>
          </Div>
        </Flex>

        <FlexTable keys={tableKey} data={tableData} />
        <Pagination
          pageCount={orderData.length}
          currentPage={currentPage}
          handlePageChange={(page: number) => setCurrentPage(page)}
        />
      </Section>
    </div>
  );
};

export default List;

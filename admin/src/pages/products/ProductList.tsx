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

const List = () => {
  const dispatch = useDispatch();
  const { category } = useParams();
  const [sort, setSort] = useState("new");
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getProducts({ category, sort, page: currentPage }));
  }, [dispatch, category, sort, currentPage]);

  const { products } = useSelector((state: RootState) => state.products);

  const tableKey = [
    {
      name: "Id",
      width: "flexOne",
    },
    {
      name: "name",
      width: "flexThree",
    },
    {
      name: "brand",
      width: "flexTwo",
    },
    {
      name: "price",
      width: "flexOne",
    },
    {
      name: "category",
      width: "flexTwo",
    },
  ];

  const tableData =
    products &&
    products.data.map((item) => {
      return [
        { value: item._id, width: "flexOne" },
        { value: item.name, width: "flexThree" },
        { value: item.brand.name, width: "flexTwo" },
        {
          value: `${item.price!.currency}${item.price!.current}`,
          width: "flexOne",
        },
        { value: item.category1!.name, width: "flexTwo" },
      ];
    });

  const filterData = ["all", "snacks", "beverage", "pantry"];

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
      <Flex justifyContent="space-between">
        <Div>
          <Header title="Products" textAlign="left" />
          <Breadcrumbs
            category1={{ title: "Home", link: "/home" }}
            category2={{ title: "Product List" }}
          />
        </Div>
        <div>add product button</div>
      </Flex>

      <Section bgColor="#fff" padding="1.25rem">
        <Flex justifyContent="space-between" margin="0 0 2rem">
          <Filter data={filterData} category={category} className="flexTwo" />
          <Div className="flexOne">
            <form onSubmit={handleSearchSubmit}>
              <TextInput
                placeholder="Search by name, brand or id"
                type="search"
                value={search}
                onChange={handleInputChange}
              />
            </form>
          </Div>
        </Flex>

        <FlexTable keys={tableKey} data={tableData} param="../../product" />
        <Pagination
          pageCount={products.totalPages}
          currentPage={currentPage}
          handlePageChange={(page: number) => setCurrentPage(page)}
        />
      </Section>
    </div>
  );
};

export default List;

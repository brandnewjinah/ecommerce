import React, { useEffect, useState } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "../../components/Breadcrumbs";
import { Div, Flex } from "../../components/containers/Div";
import { Section } from "../../components/containers/Section";
import { Header } from "../../components/Header";
import Table from "../../components/Table";
import { TextInput } from "../../components/TextInput";
import { deviceData } from "../../data/deviceData";
import { getProducts } from "../../redux/productReducer";
import { RootState } from "../../redux/store";

const List = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState("all");
  const [sub, setSub] = useState("");
  const [sort, setSort] = useState("new");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getProducts({ category, sub, sort, page: currentPage }));
  }, [dispatch, category, sub, sort, currentPage]);

  const { products } = useSelector((state: RootState) => state.products);

  return (
    <div>
      <Flex justifyContent="space-between">
        <Div>
          <Header title="Products" textAlign="left" />
          <Breadcrumbs
            category1={{ title: "Home", link: "/home" }}
            category2="Product List"
          />
        </Div>
        <div>add</div>
      </Flex>

      <Section bgColor="#fff" padding="1.25rem">
        <TextInput placeholder="Search by product name, brand or id" />
        <div>Filter: All, Category1, Category2, Category3</div>

        <Table
          data={deviceData}
          keys={["product", "name", "brand", "price", "category", "stock"]}
          showId={false}
        />
      </Section>

      {/* {products &&
        products.data.map((product) => (
          <div key={product._id}>{product.name}</div>
        ))} */}
    </div>
  );
};

export default List;

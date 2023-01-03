import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

//redux
import Breadcrumbs from "../../components/Breadcrumbs";
import { Div, Flex } from "../../components/containers/Div";
import { Section } from "../../components/containers/Section";
import Filter from "../../components/Filter";
import { Header } from "../../components/Header";
import Table from "../../components/Table";
import { TextInput } from "../../components/TextInput";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/productReducer";
import { RootState } from "../../redux/store";

const List = () => {
  const dispatch = useDispatch();
  const { category } = useParams();
  const [sort, setSort] = useState("new");
  const [currentPage, setCurrentPage] = useState(1);

  console.log(category);

  useEffect(() => {
    dispatch(getProducts({ category, sort, page: currentPage }));
  }, [dispatch, category, sort, currentPage]);

  const { products } = useSelector((state: RootState) => state.products);

  const newObj =
    products &&
    products.data.map((item) => {
      return {
        id: item._id,
        name: item.name,
        brand: item.brand,
        price: item.price,
        category: item.category1.label,
        stock: 1,
      };
    });

  const filterData = ["all", "snacks", "beverage", "pantry"];

  return (
    <div>
      <Flex justifyContent="space-between">
        <Div>
          <Header title="Products" textAlign="left" />
          <Breadcrumbs
            category1={{ title: "Home", link: "/home" }}
            category2="Product List CSS color change"
          />
        </Div>
        <div>add product button</div>
      </Flex>

      <Section bgColor="#fff" padding="1.25rem">
        <Flex justifyContent="space-between" margin="0 0 2rem">
          <Filter data={filterData} category={category} className="flexOne" />
          <TextInput
            placeholder="Search by product name, brand or id dispatch search"
            className="flexOne"
          />
        </Flex>

        <Table
          data={newObj}
          keys={["name", "brand", "price", "category", "stock"]}
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

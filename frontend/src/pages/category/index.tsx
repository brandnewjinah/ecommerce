import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//comp
import Loading from "../../components/Loading";
import { Header } from "../../components/Header";
import ProductList from "../../components/products/Products";
import { Flex } from "../../components/containers/Div";
import Filter from "../../components/Filter";
import Sort from "../../components/Sort";
import Pagination from "../../components/Pagination";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../redux/categoryRedux";
import { RootState } from "../../redux/store";

const Products = () => {
  const dispatch = useDispatch();
  const { category } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getCategory({ category, currentPage }));
  }, [dispatch, category, currentPage]);

  const { isLoading, products } = useSelector(
    (state: RootState) => state.category
  );

  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("Newest");

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Header
            title={
              category === "new" ||
              category === "bakery" ||
              category === "beverage" ||
              category === "snacks"
                ? category
                : "All"
            }
            caption={`${products.totalCount} products`}
          />
          <Flex padding="1.25rem 0">
            <Filter
              category={category}
              handleFilter={(id: any) => setFilter(id)}
            />
            <Sort
              options={["Newest", "Price: low to high", "Price: high to low"]}
              selected={sort}
              handleSort={(e) => setSort(e.target.value)}
            />
          </Flex>
          <ProductList
            products={products.data}
            category={category}
            filter={filter}
            sort={sort}
          />
          <Pagination
            pageCount={products.totalPages}
            currentPage={currentPage}
            handlePageChange={(page: number) => setCurrentPage(page)}
          />
        </>
      )}
    </>
  );
};

export default Products;

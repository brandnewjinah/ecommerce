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
import { getCategory } from "../../redux/categoryReducer";
import { RootState } from "../../redux/store";

const Products = () => {
  const dispatch = useDispatch();
  const { category, sub } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const [sort, setSort] = useState("new");

  useEffect(() => {
    dispatch(getCategory({ category, sub, sort, page: currentPage }));
  }, [dispatch, category, sub, sort, currentPage]);

  const { isLoading, products } = useSelector(
    (state: RootState) => state.category
  );

  useEffect(() => {
    setSort("new");
  }, [category, sub]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Header
            title={category}
            caption={`${products.totalCount} products`}
          />
          <Flex padding="1.25rem 0">
            <Filter category={category!} sub={sub} />
            <Sort
              options={[
                { value: "new", label: "Newest" },
                { value: "asc", label: "Price: low to high" },
                { value: "desc", label: "Price: high to low" },
              ]}
              selected={sort}
              handleSort={(e) => setSort(e.target.value)}
            />
          </Flex>
          <ProductList products={products.data} />
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

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//components
import { Container, FilterContainer } from "../components/layout/Containers";
import { Header } from "../components/layout/Header";
import Filter from "../components/Filter";
import Sort from "../components/Sort";
import Products from "../components/products/Products";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

//redux
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../redux/productRedux";

const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { category } = useParams();
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("Newest");

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;
  const { pages, data } = products;

  useEffect(() => {
    dispatch(getProducts({ category, page: currentPage }));
  }, [dispatch, category, currentPage]);

  useEffect(() => {
    if (category) {
      setSort("Newest");
      setFilter("");
    }
  }, [category]);

  const handleFilter = (id) => {
    setFilter(id);
  };

  const handleSort = (e) => {
    setSort(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage>{`${error} this is error message component`}</ErrorMessage>
      ) : (
        <>
          <Header
            title={
              category === "bakery" ||
              category === "beverage" ||
              category === "snacks"
                ? category
                : "All"
            }
          />
          <FilterContainer>
            <Filter category={category} handleFilter={handleFilter} />
            <Sort
              options={["Newest", "Price: low to high", "Price: high to low"]}
              selected={sort}
              handleSort={(e) => handleSort(e)}
            />
          </FilterContainer>
          <Products
            products={data}
            category={category}
            filter={filter}
            sort={sort}
          />
          <Pagination
            pageCount={pages}
            currentPage={currentPage}
            handlePageChange={(page) => handlePageChange(page)}
          />
        </>
      )}
    </>
  );
};

export default ProductList;

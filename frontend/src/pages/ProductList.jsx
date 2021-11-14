import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//components
import {
  Container,
  HeaderContainer,
  FilterContainer,
} from "../components/layout/Containers";
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
  const { category } = useParams();
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("Newest");

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  useEffect(() => {
    dispatch(getProducts(category));
  }, [dispatch, category]);

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

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage>{`${error} this is error message component`}</ErrorMessage>
      ) : (
        <>
          <HeaderContainer
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
            products={products}
            category={category}
            filter={filter}
            sort={sort}
          />
          <Pagination />
        </>
      )}
    </Container>
  );
};

export default ProductList;

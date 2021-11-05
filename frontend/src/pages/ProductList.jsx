import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

//components
import Filter from "../components/Filter";
import Sort from "../components/Sort";
import Products from "../components/products/Products";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

//redux
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../reducers/productReducer";

const ProductList = () => {
  const dispatch = useDispatch();
  const productlist = useSelector((state) => state.productlist);
  const { loading, error, products } = productlist;

  const { id } = useParams();
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("Newest");

  useEffect(() => {
    dispatch(getProducts(id));
  }, [id]);

  useEffect(() => {
    if (id) {
      setSort("Newest");
      setFilter("");
    }
  }, [id]);

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
          <Header>
            <h3>
              {id === "bakery" || id === "beverage" || id === "snacks"
                ? id
                : "All"}
            </h3>
          </Header>
          <FilterWrapper>
            <Filter category={id} handleFilter={handleFilter} />
            <Sort
              options={["Newest", "Price: low to high", "Price: high to low"]}
              selected={sort}
              handleSort={(e) => handleSort(e)}
            />
          </FilterWrapper>
          <Products
            products={products}
            category={id}
            filter={filter}
            sort={sort}
          />
          <Pagination />
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  flex-direction: column;
  max-width: 90rem;
  padding: 0 1.5rem;
  margin: 4rem auto;
`;

const Header = styled.div`
  h3 {
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.05rem;
  }
`;

const FilterWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 0;
`;

export default ProductList;

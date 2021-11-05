import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import _ from "lodash";
import styled from "styled-components";

//layout components
import { Section } from "../components/layout/Container";

//components
import Filter from "../components/Filter";
import Sort from "../components/Sort";
import Products from "../components/products/Products";
import Pagination from "../components/Pagination";

//data
import { demoProducts } from "../data/demoProducts";
import { typeScale } from "../components/token";

const ProductList = (props) => {
  let { id } = useParams();
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("Newest");

  useEffect(() => {
    if (id) {
      setSort("Newset");
      setFilter("");
    }
  }, [id]);

  useEffect(() => {
    const getData = () => {
      const data = [...demoProducts];

      const filteredProducts =
        id === "all"
          ? data
          : filter === "all" || filter === id || filter === ""
          ? data.filter((product) => product.category1.value === id)
          : data.filter((product) => product.category2.value === filter);

      setProducts(filteredProducts);
    };
    getData();
  }, [id, filter]);

  useEffect(() => {
    if (sort === "Price: low to high") {
      setProducts((prev) =>
        _.orderBy(prev, (item) => parseInt(item.price), ["asc"])
      );
    } else if (sort === "Price: high to low") {
      setProducts((prev) =>
        _.orderBy(prev, (item) => parseInt(item.price), ["desc"])
      );
    }
  }, [sort]);

  const handleFilter = (id) => {
    setFilter(id);
  };

  const handleSort = (e) => {
    setSort(e.target.value);
  };

  return (
    <Container>
      <Header>
        <h3>Wishlist</h3>
        <p>
          You haven't saved anything to your wishlist. Add items to your
          wishlist and personalize your shopping experience.
        </p>
      </Header>
      {/* <FilterWrapper>
        <Filter category={id} handleFilter={handleFilter} />
        <Sort
          options={["Newest", "Price: low to high", "Price: high to low"]}
          selected={sort}
          handleSort={(e) => handleSort(e)}
        />
      </FilterWrapper>
      <Section>
        <Products data={products} />
      </Section>
      <div>1</div>
      <div>2</div> */}
    </Container>
  );
};

const Container = styled.div`
  flex-direction: column;
  max-width: 1280px;
  padding: 0 2.5rem;
  margin: 4rem auto;

  h2 {
    text-transform: uppercase;
  }
`;

const Header = styled.div`
  text-align: center;
  h3 {
    text-transform: uppercase;
    letter-spacing: 0.05rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: ${typeScale.body};
  }
`;

const FilterWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default ProductList;

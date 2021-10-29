import React from "react";
import styled from "styled-components";

//layout components
import { Section } from "../../components/layout/Container";

//components
import Filter from "../../components/Filter";
import Grid from "../../components/Grid";
import Card from "../../components/ProductCard";
import Pagination from "../../components/Pagination";

//token
import { spacing } from "../../components/token";

const CategoryPresenter = (props) => {
  return (
    <Container className="flexAignCenter">
      <h2>{props.path}</h2>
      <FilterContainer>
        <Filter category={props.path} handleCatChange={props.handleCatChange} />
        <Sort>
          <Select>
            <Option selected>Newest</Option>
            <Option>Price: low to high</Option>
            <Option>Price: high to low</Option>
          </Select>
        </Sort>
      </FilterContainer>
      <Section padding={`${spacing.l} 0`}>
        <Grid>
          {props.products &&
            props.products.length > 0 &&
            props.products.map((p, idx) => (
              <Card
                key={idx}
                id={p.sku}
                brand={p.brand}
                name={p.name}
                currency={p.currency && p.currency.label}
                price={p.price}
                imageUrl={p.imgs[0].src}
              />
            ))}
        </Grid>
      </Section>
      <Pagination
        count={props.count}
        limit={props.limit}
        currentPage={props.currentPage}
        handlePageChange={props.handlePageChange}
      />
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

const FilterContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Sort = styled.div``;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;

const Option = styled.option``;

export default CategoryPresenter;

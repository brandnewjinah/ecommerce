import React from "react";

//import components
import Layout from "../../components/main/Layout";
import Section from "../../components/main/Section";
import { Card } from "../../components/main/ProductCard";
import Filter from "../../components/Filter";
import Pagination from "../../components/Pagination";

//import styles and assets
import styled from "styled-components";

const CategoryPresenter = (props) => {
  return (
    <Layout>
      <Wrapper>
        <h2>{props.path}</h2>
        <Filter category={props.path} handleCatChange={props.handleCatChange} />
        <Container>
          <Section>
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
          </Section>
        </Container>
        <Pagination
          count={props.count}
          limit={props.limit}
          currentPage={props.currentPage}
          handlePageChange={props.handlePageChange}
        />
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2em 0;

  h2 {
    font-size: 1.5rem;
    text-transform: capitalize;
  }
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .col {
    width: 32%;
    padding-right: 2%;
  }

  @media (max-width: 840px) {
    .col {
      width: 48%;
      padding: 0 2%;
    }
  }
`;

export default CategoryPresenter;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import config from "../../config.json";
import axios from "axios";

//import components
import Layout from "../../components/main/Layout";
import Section from "../../components/main/Section";
import { BtnText } from "../../components/Button";
import { Card } from "../../components/main/ProductCard";
import Filter from "../../components/Filter";

//import styles and assets
import styled from "styled-components";

//redux
import { connect } from "react-redux";

const Products = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data } = await axios.get(`${config.API}/product`);
    // const { data } = await axios.get("./data/data.json");
    setData(data.products);
  };

  return (
    <Layout>
      <Wrapper>
        <h2>Collection</h2>
        <Link to="/addcollection">Add</Link>
        <Container>
          <Section>
            {props.fashion.map((p, idx) => (
              <Card
                id={p.sku}
                store={p.store}
                name={p.name}
                currency={p.currency && p.currency.label}
                price={p.price}
                imageUrl={p.image}
              />
            ))}
          </Section>
        </Container>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  /* background-color: firebrick; */
  padding: 2em 0;

  h2 {
    font-size: 1.5rem;
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

const mapStateToProps = (state) => {
  return {
    fashion: state.fashion.products,
  };
};

export default connect(mapStateToProps, null)(Products);
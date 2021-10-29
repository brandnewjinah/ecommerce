import React, { useEffect, useState } from "react";

//import components
import { BtnText } from "../../../components/Button";
import Table from "./Table";

//import styles and assetss
import styled from "styled-components";

//demo data
import { demoProducts } from "../../../data/demoProducts";

//redux
import { connect } from "react-redux";
import { deleteAll, deleteItem } from "../../../reducers/productReducer";

const ProductList = (props) => {
  const [data, setData] = useState();

  const handleDeleteAll = async () => {
    props.deleteAll();
  };

  const handleDelete = (t) => {
    props.deleteItem(t);
  };

  useEffect(() => {
    const getData = () => {
      let allData = [...demoProducts, ...props.product];
      console.log(allData);
      setData(allData);
    };

    getData();
  }, [props.product]);

  return (
    <Wrapper>
      <h4>Inventory</h4>
      <Container>
        <Table
          col1="SKU"
          col2="Name"
          col3="Price"
          col4="Brand"
          col5="Category1"
          col6="Category2"
          col7="Action"
          data={data}
          handleDelete={(t) => handleDelete(t)}
        />
      </Container>
      {/* <BtnText label="Delete All" handleClick={handleDeleteAll} /> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .container {
    width: 100%;
    display: flex;
    padding: 1em;
  }

  a {
    width: 100%;
    display: flex;
  }
`;

const Container = styled.div`
  background-color: #fff;
  border: 1px solid #f4f4f4;
  border-radius: 0.5em;
  box-shadow: 0 0 2em 0 rgba(113, 113, 113, 0.05);
`;

const mapStateToProps = (state) => {
  return {
    product: state.products.products,
  };
};

export default connect(mapStateToProps, { deleteAll, deleteItem })(ProductList);

import React, { useEffect, useState } from "react";
import _ from "lodash";

//import components
import Table from "../../../components/Table";

//import styles and assetss
import styled from "styled-components";

//demo data
import { demoProducts } from "../../../data/demo/demoProducts";

//redux
import { connect } from "react-redux";
import { deleteAll, deleteItem } from "../../../reducers/productReducer";

const ProductList = (props) => {
  const [productData, setProductData] = useState([]);
  const dataKeys = [
    { id: "sku", name: "SKU", sort: true, width: "7.5%" },
    { id: "name", name: "Name", sort: true, width: "28%" },
    { id: "price", name: "Price", sort: true, width: "9%" },
    { id: "brand", name: "Brand", sort: true, width: "14%" },
    { id: "main", name: "Main Category", sort: true, width: "15%" },
    { id: "sub", name: "Sub Category", sort: true, width: "15%" },
    { id: "action", name: "Action", sort: false, width: "6.5%" },
  ];
  // const [data, setData] = useState();

  // const handleDeleteAll = async () => {
  //   props.deleteAll();
  // };

  // const handleDelete = (t) => {
  //   props.deleteItem(t);
  // };

  // useEffect(() => {
  //   const getData = () => {
  //     let allData = [...demoProducts, ...props.product];
  //     console.log(allData);
  //     setData(allData);
  //   };

  //   getData();
  // }, [props.product]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    let data = _.orderBy(demoProducts, ["orderId"], ["desc"]);
    let res = data.map((item) => ({
      sku: item.sku,
      name: item.name,
      price: item.price,
      brand: item.brand,
      main: item.category1.value,
      sub: item.category2.value,
      action: null,
    }));
    setProductData(res);
  };

  return (
    <Wrapper>
      <div className="pageTitle">
        <h3>PRODUCTS</h3>
      </div>
      <Container>
        <Table keys={dataKeys} data={productData} checkbox />
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

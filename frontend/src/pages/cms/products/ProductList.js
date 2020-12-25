import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

//import components
import { BtnText } from "../../../components/Button";
import Table from "../../../components/cms/Table";

//import styles and assetss
import styled from "styled-components";

//redux
import { connect } from "react-redux";
import { deleteAll } from "../../../reducers/fashionReducer";

const ProductList = (props) => {
  const [data, setData] = useState([]);

  //   useEffect(() => {
  //     getData();
  //   }, []);

  const getData = async () => {
    // const { data } = await axios.get(`${config.API}/product`);
    // setData(data.products);
  };

  const handleDelete = async () => {
    props.deleteAll();
    // await axios
    //   .delete(`${config.API}/product/`)
    //   .then((res) => {
    //     if (res.status === 200) {
    //       alert("All Products Deleted");
    //       window.location.reload();
    //     }
    //   })
    //   .catch((err) => {
    //     alert(err);
    //   });
  };

  //   <div
  //             className={idx % 2 === 0 ? "container" : "container odd"}
  //             key={idx}
  //           >
  //             <Link to={`/products/${p.sku}`}>
  //               <div className="code">{p.sku}</div>
  //               <div className="name">{p.name}</div>
  //               <div className="price">{p.price}</div>
  //               <div className="cat">{p.category1}</div>
  //             </Link>
  //           </div>

  return (
    <Wrapper>
      <h4>Inventory</h4>
      {/* <p>{data.length} products total</p> */}
      <BtnText label="Delete All" handleClick={handleDelete} />
      <Container>
        <Table
          col1="Name"
          col2="Brand"
          col3="Category1"
          col4="Category2"
          col5="Store"
          data={props.fashion}
        />
      </Container>
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
  padding: 2em;
`;

const mapStateToProps = (state) => {
  return {
    fashion: state.fashion.products,
  };
};

export default connect(mapStateToProps, { deleteAll })(ProductList);

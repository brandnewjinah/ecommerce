import React from "react";

//import components
import { BtnText } from "../../../components/Button";
import Table from "./Table";

//demo data
import { demoOrders } from "../../../data/demo/demoOrders";

//import styles and assetss
import styled from "styled-components";

//redux
import { connect } from "react-redux";
import { deleteAll, deleteItem } from "../../../reducers/productReducer";

const OrderList = (props) => {
  // const [data, setData] = useState([]);

  //   useEffect(() => {
  //     getData();
  //   }, []);

  // const getData = async () => {
  //   const { data } = await axios.get(`${config.API}/product`);
  //   setData(data.products);
  // };

  const handleDeleteAll = async () => {
    props.deleteAll();
  };

  const handleDelete = (t) => {
    props.deleteItem(t);
  };

  return (
    <Wrapper>
      <h4>Orders</h4>
      {/* <p>{data.length} products total</p> */}

      <Container>
        <Table
          col1="Number"
          col2="Ordered Date"
          col3="Ship To"
          col4="Total"
          col5="Status"
          data={demoOrders}
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
    order: state.order.orders,
  };
};

export default connect(mapStateToProps, { deleteAll, deleteItem })(OrderList);

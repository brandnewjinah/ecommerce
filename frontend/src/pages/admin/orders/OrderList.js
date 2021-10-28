import React, { useEffect, useState } from "react";
import moment from "moment";
import _ from "lodash";
import styled from "styled-components";

//import components
import { Card } from "../../../components/Card";
import Table from "../../../components/Table";

//demo data
import { demoOrders } from "../../../data/demo/demoOrders";

//redux
import { connect } from "react-redux";
import { deleteAll, deleteItem } from "../../../reducers/productReducer";

const OrderList = (props) => {
  const [orderData, setOrderData] = useState([]);
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

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    let data = _.orderBy(demoOrders, ["orderId"], ["desc"]);
    let res = data.map((item) => ({
      order: item.orderId,
      date: moment(item.date).format("lll"),
      customer: `${item.shipping.firstName} ${item.shipping.lastName}`,
      status: item.status,
      total: `${item.currency}${item.total}`,
    }));
    setOrderData(res);
  };

  return (
    <Wrapper>
      <div className="pageTitle">
        <h3>ORDERS</h3>
      </div>
      <Card>
        <Table
          keys={["Order", "Date", "Customer", "Status", "Total"]}
          data={orderData}
        />
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const mapStateToProps = (state) => {
  return {
    order: state.order.orders,
  };
};

export default connect(mapStateToProps, { deleteAll, deleteItem })(OrderList);

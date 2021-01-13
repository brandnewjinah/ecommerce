import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//import components
import Layout from "../../components/main/Layout";
import OrderItem from "./OrderItem";

//import styles and assets
import styled from "styled-components";
import colors from "../../components/Colors";

//import redux
import { connect } from "react-redux";

const OrderConfirmation = (props) => {
  let { id } = useParams();

  const [data, setData] = useState({});

  useEffect(() => {
    const getData = async () => {
      const currentOrder = props.order.find((o) => o.id === parseInt(id));
      setData(currentOrder);
    };
    getData();
  }, [id, props.order]);
  console.log(data);
  return (
    <Layout>
      <Wrapper>
        <Header>
          <h4>THANK YOU</h4>
          <p>
            We are getting started on your order right away, and you will
            receive order confirmation email shortly.
          </p>
        </Header>
        <Details>
          <h6>Order Details - #{data.id}</h6>
          <div className="flex">
            <div className="three">
              <p>Shipping Address</p>
              <p>{data && data.shipping && data.shipping.address1}</p>
              <p>
                {data && data.shipping && data.shipping.city},{" "}
                {data && data.shipping && data.shipping.state}{" "}
                {data && data.shipping && data.shipping.zip}
              </p>
            </div>
            <div className="three">
              <p>Delivery Method</p>
              <p>{data && data.shipping && data.shipping.shipping}</p>
            </div>
            <div className="three">
              <p>Payment Method</p>
              <p>****{data && data.billing && data.billing.cardNumber}</p>
            </div>
          </div>
        </Details>
        <Summary>
          <h6>Summary</h6>
          {data.items &&
            data.items.length > 0 &&
            data.items.map((item, idx) => <OrderItem data={item} />)}
        </Summary>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 2em;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  p {
    width: 50%;
    line-height: 1.25rem;
  }
`;

const Details = styled.main`
  width: 100%;
  padding: 2em 0;

  p {
    line-height: 1.25rem;
  }

  .flex {
    display: flex;
  }

  .three {
    flex: 0 1 33.3%;
  }
`;

const Summary = styled.div`
  padding: 2em 0;
`;

const mapStateToProps = (state) => {
  return {
    order: state.order.orders,
  };
};

export default connect(mapStateToProps, null)(OrderConfirmation);

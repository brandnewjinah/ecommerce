import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

//import libraries
import Select from "react-select";
import moment from "moment";

//import components
import Input from "../../../components/Input";
import { Button } from "../../../components/Button";
import OrderItem from "./OrderItem";

//demo dataㄴ
import { demoOrders } from "../../../data/demo/demoOrders";

//redux
import { connect } from "react-redux";
import { addItem, editItem } from "../../../reducers/productReducer";

//import styles and assets
import styled from "styled-components";
import colors from "../../../components/Colors";

const OrderDetail = (props) => {
  let { id } = useParams();

  const [data, setData] = useState({});
  const [shipped, setShipped] = useState(false);
  useEffect(() => {
    const getData = () => {
      const currentItem = demoOrders.find((c) => c.id === parseInt(id));
      setData(currentItem);
    };

    getData();
  }, [id, props.order]);

  const getTotal = () => {
    const total =
      data.items &&
      data.items.reduce((total, item) => {
        return item.price * item.qty + total;
      }, 0);
    return total;
  };

  console.log(getTotal());

  return (
    <Wrapper>
      <Flex>
        <div>
          <h6>Order Detail</h6>
        </div>
        <div>{/* <Button label="Save" type="fill" color="#06193b" /> */}</div>
      </Flex>
      <Container>
        <Flex>
          <div>
            <p className="label">Order Number:</p>
            <p>{data.id}</p>
          </div>
          <div>
            <p className="label">Order Date:</p>{" "}
            <p>{moment(data.date).format("MMMM DD YYYY, h:mm a")}</p>
          </div>
          <div>
            <p className="label">Order Status</p>
            <p>{data.status}</p>
          </div>
        </Flex>
      </Container>
      <Container>
        {data.items &&
          data.items.length > 0 &&
          data.items.map((item, idx) => <OrderItem data={item} />)}
        <Sub>
          <div className="eight label">Item Total</div>
          <div className="two">${getTotal()}</div>
        </Sub>
        <Sub>
          <div className="eight label">Shipping</div>
          <div className="two">${getTotal()}</div>
        </Sub>
        <Sub>
          <div className="eight label">Tax</div>
          <div className="two">${getTotal()}</div>
        </Sub>
        <Sub>
          <div className="eight label">Total</div>
          <div className="two">${getTotal()}</div>
        </Sub>
      </Container>

      <Container>
        <Flex>
          <div>
            <p className="label">Recipient</p>
            <p>{`${data.shipping && data.shipping.firstName} ${
              data.shipping && data.shipping.lastName
            }`}</p>
          </div>
          <div>
            <p className="label">Address</p>
            <p>{`${data.shipping && data.shipping.address1} ${
              data.shipping && data.shipping.city
            } ${data.shipping && data.shipping.state} ${
              data.shipping && data.shipping.zip
            } `}</p>
          </div>
          <div>
            <p className="label">Shipping Method</p>
            <p>{data.shipping && data.shipping.shipping}</p>
          </div>
        </Flex>
      </Container>
      <Container>
        <Flex>
          <div>
            <p className="label">Item Shipped?</p>
            <input
              type="checkbox"
              name="shipped"
              checked={shipped}
              onChange={() => setShipped(!shipped)}
            />
          </div>
        </Flex>
      </Container>
      <div className="right">
        {/* <Button label="Save" type="fill" color="#06193b" /> */}
      </div>
    </Wrapper>
  );
};

const customStyles = {
  control: (styles) => ({
    ...styles,
    borderRadius: `0.25em`,
    border: `1px solid #e4e4e4`,
  }),
  multiValue: (styles) => ({
    ...styles,
    backgroundColor: colors.lightergray,
    padding: `0 0.5em`,
  }),
};

const Wrapper = styled.div`
  h6 {
    text-transform: uppercase;
  }

  .right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`;

const Container = styled.div`
  background-color: #fff;
  box-shadow: 0 0 30px 0 rgba(63, 76, 105, 0.05);
  border-radius: 0.25em;
  padding: 2em;
  margin-bottom: 1em;

  .item {
    margin-bottom: 1em;
  }

  .label {
    font-weight: 400;
    color: ${colors.darkergray};
  }

  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Sub = styled.div`
  display: flex;
  font-size: 0.825rem;
  margin: 1em;

  .eight {
    flex: 0 1 80%;
    text-align: right;
  }

  .two {
    flex: 0 1 20%;
    text-align: right;
  }
`;

const Flex = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1em;

  .one {
    flex: 0 1 9%;
  }

  .two {
    flex: 0 1 20%;
  }

  .five {
    flex: 0 1 49.5%;
  }

  .eight {
    flex: 0 1 79%;
  }

  .nine {
    flex: 0 1 90%;
  }

  @media (max-width: 780px) {
    .eight {
      flex: 0 1 49.5%;
    }

    .two {
      flex: 0 1 49.5%;
    }

    .one {
      flex: 0 1 49.5%;
    }

    .nine {
      flex: 0 1 49.5%;
    }
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1em;

  .left {
    width: 96%;
  }

  .right {
    width: 2%;
    padding-top: 2.25em;
  }
`;

const mapStateToProps = (state) => {
  return {
    order: state.order.orders,
  };
};

export default connect(mapStateToProps, { addItem, editItem })(OrderDetail);

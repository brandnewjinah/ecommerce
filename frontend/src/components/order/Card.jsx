import React from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import styled from "styled-components";

import { neutral, typeScale } from "../token";
import { Link } from "react-router-dom";
import { Button } from "../Button";

const Card = ({ order }) => {
  const history = useHistory();
  const handleClick = (orderId) => {
    history.push(`/orderdetail/${orderId}`);
  };
  return (
    <Container>
      <Header>
        <Left>
          <div>
            <span className="title">Order Date: </span>
            <span>{moment(order.createdAt).format("LLL")}</span>
          </div>
          <div>
            <span className="title">Order Number: </span>
            <span>{order._id}</span>
          </div>
        </Left>
        <Right>
          <div>
            <span className="title">Status: </span>
            <span>{order.status}</span>
          </div>
        </Right>
      </Header>
      <Content>
        <Button
          label="View Details"
          handleClick={() => handleClick(order._id)}
        />
      </Content>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${neutral[50]};
  padding: 1rem;
  margin: 1rem 0;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-size: ${typeScale.helper};
  border-bottom: 1px solid ${neutral[200]};
  padding-bottom: 0.75rem;

  div {
    padding-bottom: 0.25rem;
  }

  .title {
    font-weight: 700;
    text-transform: uppercase;
  }
`;

const Left = styled.div``;

const Right = styled.div``;

const Content = styled.div`
  padding: 1rem 0; ;
`;

export default Card;

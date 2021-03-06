import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

//d

//import styles and assets
import styled from "styled-components";

import colors from "../../../components/Colors";

const Table = (props) => {
  const formatDate = (date) => {
    return moment(date).format("MMMM Do YYYY, h:mm:ss a");
  };

  return (
    <Wrapper>
      <Customer>
        <div className="title">
          <div className="one">{props.col1}</div>
          <div className="three">{props.col2}</div>
          <div className="three">{props.col3}</div>
          <div className="three">{props.col4}</div>
          <div className="one">{props.col5}</div>
        </div>
        {props.data &&
          props.data.map((t, idx) => (
            <Body to={`orders/${t.id}`} key={idx}>
              <div className="one">{t.id}</div>
              <div className="three">{formatDate(t.date)}</div>
              <div className="three">
                {t.shipping.firstName} {t.shipping.lastName}
              </div>
              <div className="three">${t.total}</div>
              <div className="one">{t.status}</div>
            </Body>
          ))}
      </Customer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 2em;
`;

const Customer = styled.div`
  .title {
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    font-weight: 600;
    color: #b5b5c3;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    padding-bottom: 0.65em;
  }

  .one {
    flex: 0 1 10%;
  }

  .three {
    flex: 0 1 26%;
  }
`;

const Body = styled(Link)`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  letter-spacing: 0.025rem;
  color: #3f4254;
  border-top: 1px solid ${colors.lightgray};
  padding: 1em 0;
`;

export default Table;

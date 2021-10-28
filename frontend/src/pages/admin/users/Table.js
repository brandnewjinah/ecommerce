import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

//import components

//demo data
import { demoCustomers } from "../../../data/demo/demoCustomers";

//import styles and assets
import styled from "styled-components";
import colors from "../../../components/Colors";

const Table = (props) => {
  const formatDate = (date) => {
    return moment(date).format("MMM Do YYYY, h:mm a");
  };

  return (
    <Wrapper>
      <Customer>
        <div className="title">
          <div className="one">#</div>
          <div className="three">Name</div>
          <div className="three">Email</div>
          <div className="three">Joined</div>
          <div className="one">Role</div>
        </div>
        {demoCustomers &&
          demoCustomers.map((t, idx) => (
            <Body to={`customers/${t.id}`} key={idx}>
              <div className="one">{t.id}</div>
              <div className="three">{t.name}</div>
              <div className="three">{t.email}</div>
              <div className="three">{formatDate(t.joined)}</div>
              <div className="one">{t.role.label}</div>
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

  .body {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    letter-spacing: 0.025rem;
    color: #3f4254;
    border-top: 1px solid ${colors.lightgray};
    padding: 1em 0;
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

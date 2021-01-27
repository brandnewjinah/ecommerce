import React from "react";
import { Link } from "react-router-dom";

//d

//import styles and assets
import styled from "styled-components";
import { Trash } from "../../../assets/Icons";
import colors from "../../../components/Colors";

const Table = (props) => {
  return (
    <Wrapper>
      <Product>
        <div className="title">
          <div className="one">{props.col1}</div>
          <div className="three">{props.col2}</div>
          <div className="one">{props.col3}</div>
          <div className="two">{props.col4}</div>
          <div className="two">{props.col5}</div>
          <div className="two">{props.col6}</div>
          <div className="one">{props.col7}</div>
        </div>
        {props.data &&
          props.data.map((t, idx) => (
            <Body to={`products/edit/${t.sku}`} key={idx}>
              <div className="one">{t.sku}</div>
              <div className="three">{t.name}</div>
              <div className="one">
                {t.currency.label}
                {t.price}
              </div>
              <div className="two">{t.brand}</div>
              <div className="two">{t.category1.label}</div>
              <div className="two">{t.category2.label}</div>
              <div
                className="action"
                onClick={() => props.handleDelete(t)}
                style={{
                  cursor: `pointer`,
                }}
              >
                <Trash width="18" height="18" color={colors.red} stroke="1" />
              </div>
            </Body>
          ))}
      </Product>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 2em;
`;

const Product = styled.div`
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

  .two {
    flex: 0 1 15%;
  }

  .three {
    flex: 0 1 25%;
  }

  .action {
    flex: 0 1 10%;
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

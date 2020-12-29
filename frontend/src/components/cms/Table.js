import React, { useState } from "react";
import { Link } from "react-router-dom";

//import components

//import styles and assets
import styled from "styled-components";
import { Trash } from "../../assets/Icons";
import colors from "../Colors";

const Table = (props) => {
  const handleDelete = (t) => {
    props.deleteNote(t);
  };

  return (
    <Wrapper>
      <table>
        <thead>
          <tr>
            <th>{props.col1}</th>
            <th>{props.col2}</th>
            <th>{props.col3}</th>
            <th>{props.col4}</th>
            <th>{props.col5}</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.data &&
            props.data.map((t, idx) => (
              <tr key={idx}>
                <td>
                  <Link to={`products/edit/${t.sku}`}>{t.name}</Link>
                </td>
                <td>{t.brand}</td>
                <td>{t.category1.label}</td>
                <td>{t.category2.label}</td>
                <td>{t.store}</td>

                <td
                  onClick={() => handleDelete(t)}
                  style={{
                    cursor: `pointer`,
                  }}
                >
                  <Trash width="18" height="18" color={colors.red} stroke="1" />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 2em;

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th {
    text-align: left;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.02rem;
    color: ${colors.gray};
    padding: 0.75em 0;
  }

  td {
    font-size: 0.8rem;
    color: #3e3a41;
    padding: 1em 0;
    border-top: 1px solid ${colors.lightgray};

    &:last-child {
      text-align: center;
    }
  }
  input {
    width: 100%;
    border: 1px solid #e4e4e4;
    border-radius: 0.25em;
    outline: transparent;
    /* padding: 0.1em; */
  }
  @media (max-width: 980px) {
    table,
    thead,
    tbody,
    th,
    td,
    tr {
      display: block;
    }
    thead tr {
      position: absolute;
      top: -9999px;
      left: -9999px;
    }
    tr {
      margin: 0 0 1rem 0;
    }
    tr:nth-child(even) {
      background: #f0f3f7;
    }
    td {
      border: none;
      border-top: 1px solid #eee;
      position: relative;
      padding-left: 40%;

      &:first-child {
        border-top: none;
      }

      &:last-child {
        text-align: left;
      }
      &:before {
        position: absolute;
        top: 25%;
        left: 6px;
        width: 30%;
        padding-left: 1em;
        white-space: nowrap;
      }
    }
    td:nth-of-type(1):before {
      content: "Name";
    }
    td:nth-of-type(2):before {
      content: "Brand";
    }
    td:nth-of-type(3):before {
      content: "Category";
    }
    td:nth-of-type(4):before {
      content: "Category 2";
    }
    td:nth-of-type(5):before {
      content: "Store";
    }
    td:nth-of-type(6):before {
      content: "Action";
    }
  }
`;

export default Table;

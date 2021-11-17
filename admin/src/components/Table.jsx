import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import _ from "lodash";

import Checkbox from "./Checkbox";
import Pagination from "./Pagination";
import { paginate } from "../utils/Paginate";
import Th from "./Th";

//token and icons
import { neutral, primaryColor } from "./token";
import { Trash } from "../assets/Icons";

//redux
import { useDispatch } from "react-redux";
import { deleteProduct, deleteManyProducts } from "../redux/productReducer";

const Table = ({ thead, tbody, checkbox, listSize, action }) => {
  const dispatch = useDispatch();
  const pageSize = listSize ? listSize : 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [checkAll, setCheckAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [sortColumn, setSortColumn] = useState({
    path: "",
    order: "asc",
  });

  const handleSelectAll = (e) => {
    setCheckAll(!checkAll);
    setCheckedItems(sorted.map((item) => item.id));
    if (checkAll) {
      setCheckedItems([]);
    }
  };

  const handleSelect = (e) => {
    const { id, checked } = e.target;
    setCheckedItems([...checkedItems, id]);
    if (!checked) {
      setCheckedItems(checkedItems.filter((item) => item !== id));
    }
  };

  const handleDeleteMany = () => {
    dispatch(deleteManyProducts(checkedItems));
  };

  const handleSort = (path) => {
    const newSortColumn = { ...sortColumn };
    if (newSortColumn.path === path) {
      newSortColumn.order = newSortColumn.order === "asc" ? "desc" : "asc";
    } else {
      newSortColumn.path = path;
      newSortColumn.order = "asc";
    }
    setSortColumn(newSortColumn);
  };

  const sorted = _.orderBy(tbody, [sortColumn.path], [sortColumn.order]);

  //get a new array for pagination
  // const paginatedData = paginate(sorted, currentPage, pageSize);

  return (
    <Wrapper>
      <table aria-label="table">
        <thead>
          <tr>
            {checkbox && (
              <th style={{ width: "5%" }}>
                <Checkbox
                  name="selectAll"
                  id="selectAll"
                  // handleClick={(e) => handleSelectAll(e)}
                  handleSelect={handleSelectAll}
                  checked={checkAll}
                />
              </th>
            )}
            {thead.map((item, idx) => (
              <Th
                key={idx}
                name={item.name}
                id={item.id}
                handleSort={() => handleSort(item.id)}
                sort={item.sort}
                sortBy={sortColumn}
                width={item.width}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((item, idx) => (
            <tr key={idx}>
              {checkbox && (
                <td>
                  <Checkbox
                    id={item.id}
                    name={item.name}
                    checked={checkedItems.includes(item.id)}
                    handleSelect={handleSelect}
                  />
                </td>
              )}

              {Object.values(item).map(
                (it, idx, array) =>
                  idx !== array.length - 1 && (
                    <td
                      key={idx}
                      className={
                        idx === Object.values(item).length - 1
                          ? "rightAlign"
                          : ""
                      }
                    >
                      <Link to={`products/edit/${item.id}`}>
                        <span>{it}</span>
                      </Link>
                    </td>
                  )
              )}
              {action && action === "delete" && (
                <Delete onClick={() => dispatch(deleteProduct(item.id))}>
                  <Trash
                    width={18}
                    height={18}
                    color={primaryColor.error}
                    stroke={1}
                  />
                </Delete>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <Bottom>
        <div className="left" onClick={handleDeleteMany}>
          {checkedItems && checkedItems.length !== 0 && (
            <Trash
              width={18}
              height={18}
              color={primaryColor.error}
              stroke={1}
            />
          )}
        </div>
      </Bottom>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  overflow-x: auto;

  table {
    display: table;
    table-layout: fixed;
    width: 100%;
    min-width: 650px;
    border-collapse: collapse;
    white-space: nowrap;
  }

  thead tr {
    display: table-row;
  }

  thead th {
    font-size: 0.765rem;
    text-transform: uppercase;
    text-align: left;
    display: table-cell;
    flex-direction: row-reverse;
    border-bottom: 1px solid ${neutral[200]};
    overflow-x: hidden;
    overflow-y: auto;
    padding: 1rem;
    cursor: pointer;
  }

  tbody td {
    font-size: 0.875rem;
    border-bottom: 1px solid ${neutral[100]};
    padding: 1rem;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

const Delete = styled.td`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left {
    padding: 0 1rem;
    cursor: pointer;
  }

  .right {
  }
`;

export default Table;

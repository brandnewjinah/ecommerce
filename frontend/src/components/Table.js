import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import _ from "lodash";

import Checkbox from "./Checkbox";
import Pagination from "./Pagination";
import { paginate } from "../utils/Paginate";
import Th from "./Th";
import { ArrowUp, ArrowDown } from "../assets/Icon";
import { neutral } from "./token";

const Table = ({ keys, data, checkbox, listSize, dataKeys }) => {
  const pageSize = listSize ? listSize : 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [checkAll, setCheckAll] = useState(false);
  const [check, setCheck] = useState([]);
  const [sortColumn, setSortColumn] = useState({
    path: "",
    order: "asc",
  });

  const handleSelectAll = (event) => {
    setCheckAll(!checkAll);
    setCheck(data.map((item) => item.sku));
    if (checkAll) {
      setCheck([]);
    }
  };

  const handleSelect = (e) => {
    const { id, checked } = e.target;
    setCheck([...check, id]);
    if (!checked) {
      setCheck(check.filter((item) => item !== id));
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNext = () => {
    const numberOfPages = Math.ceil(data.length / pageSize);
    if (currentPage < numberOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
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

  const sorted = _.orderBy(data, [sortColumn.path], [sortColumn.order]);

  //get a new array for pagination
  const paginatedData = paginate(sorted, currentPage, pageSize);

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
                  handleClick={(e) => handleSelectAll(e)}
                  isChecked={checkAll}
                />
              </th>
            )}
            {keys.map((item, idx) => (
              <Th
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
          {paginatedData.map((item, idx) => (
            <tr key={idx}>
              {checkbox && (
                <td>
                  <Checkbox
                    id={item.sku}
                    name={item.name}
                    handleClick={handleSelect}
                    isChecked={check.includes(item.sku)}
                  />
                </td>
              )}
              {Object.values(item).map((it, idx) => (
                <td
                  key={idx}
                  className={
                    idx === Object.values(item).length - 1 ? "rightAlign" : ""
                  }
                >
                  <span>{it}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        dataLength={data.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
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

export default Table;

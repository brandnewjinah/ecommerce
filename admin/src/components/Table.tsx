import React, { FC, useState } from "react";

//import libraries
import styled from "styled-components";
import _ from "lodash";

//import components
import Pagination from "./Pagination";
import { paginate } from "../utils/Paginate";
import { neutral } from "./token";

interface Props {
  data: any;
  keys: string[];
  showId?: boolean;
  listSize?: number;
}

interface Column {
  path: string;
  order: boolean | "desc" | "asc";
}

type LinksProps = {
  numOfCol: number;
};

const Table: FC<Props> = ({ data, keys, showId, listSize }) => {
  const pageSize = listSize ? listSize : 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<Column>({
    path: "",
    order: "asc",
  });

  const handlePageChange = (page: number) => {
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

  // const handleSort = (path: string) => {
  //   const sortColumnCopy = { ...sortColumn };
  //   if (sortColumnCopy.path === path) {
  //     sortColumnCopy.order = sortColumnCopy.order === "asc" ? "desc" : "asc";
  //   } else {
  //     sortColumnCopy.path = path;
  //     sortColumnCopy.order = "asc";
  //   }
  //   setSortColumn(sortColumnCopy);
  // };

  // const sorted: any = _.orderBy(data, [sortColumn.path], [sortColumn.order]);

  // //get a new array for pagination
  // const paginatedData = paginate(sorted, currentPage, pageSize);

  return (
    <Wrapper>
      <table aria-label="table">
        <thead>
          <tr>
            {keys.map((item, idx) => (
              // <th key={idx} onClick={() => handleSort(item)}>
              <th key={idx}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item: {}, idx: number) => (
            <tr key={idx}>
              {!showId
                ? Object.values(item)
                    .slice(1)
                    .map((it: any, idx: number) => (
                      <Cell key={idx} numOfCol={Object.values(item).length - 1}>
                        {it}
                      </Cell>
                    ))
                : Object.values(item).map((it: any, idx: number) => (
                    <Cell key={idx} numOfCol={Object.values(item).length}>
                      {it}
                    </Cell>
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
  font-size: 0.875rem;
  color: ${neutral[500]};

  table {
    width: 100%;
    display: flex;
    border-collapse: collapse;

    @media (min-width: 1024px) {
      display: table;
    }
  }

  thead tr {
    display: flex;
    flex-direction: column;

    @media (min-width: 1024px) {
      display: table-row;
    }
  }

  thead th {
    font-size: 0.75rem;
    line-height: 2rem;
    text-transform: uppercase;
    text-align: left;
    border-bottom: 1px solid ${neutral[200]};
    overflow-x: hidden;
    overflow-y: auto;
    background: ${neutral[100]};
    padding: 0.75em 1em;
    cursor: pointer;

    @media (min-width: 1024px) {
      background: transparent;
      padding: 0.75em 0;
    }
  }

  tbody {
    width: 100%;
    display: flex;
    overflow-x: auto;

    @media (min-width: 1024px) {
      display: table-row-group;
    }
  }

  tbody tr {
    width: 100%;
    white-space: nowrap;
  }
`;

const Cell = styled.td<LinksProps>`
  display: block;
  line-height: 1.825rem;
  border-bottom: 1px solid ${neutral[100]};
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0.75em 1em;

  @media (min-width: 1024px) {
    width: ${(props) => 100 / props.numOfCol}%;
    display: table-cell;
    padding: 0.75em 0;
  }
`;

export default Table;

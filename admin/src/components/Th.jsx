import React from "react";
import styled from "styled-components";
import { ArrowUp, ArrowDown } from "../assets/Icons";
import { neutral } from "./token";

const Th = ({ name, sort, sortBy, id, width, handleSort }) => {
  return (
    <Thbox onClick={handleSort} width={width}>
      <div className="flexAignCenter">
        <span className="mr025">{name}</span>
        {sort && sortBy.path === id && sortBy.order === "asc" && (
          <ArrowUp width={16} height={16} color={neutral[300]} stroke={2} />
        )}
        {sort && sortBy.path === id && sortBy.order === "desc" && (
          <ArrowDown width={16} height={16} color={neutral[300]} stroke={2} />
        )}
      </div>
    </Thbox>
  );
};

const Thbox = styled.th`
  width: ${(props) => (props.width ? props.width : "auto")};
`;

export default Th;

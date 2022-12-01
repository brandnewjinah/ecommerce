import React, { FC, ChangeEventHandler } from "react";
import styled from "styled-components";
import { neutral } from "./token";

interface Props {
  options?: string[];
  selected?: string;
  handleSort?: ChangeEventHandler<HTMLSelectElement>;
}

const Sort: FC<Props> = ({ options, selected, handleSort }) => {
  return (
    <Select value={selected} onChange={handleSort}>
      {options!.map((option, idx) => (
        <Option key={idx} value={option}>
          {option}
        </Option>
      ))}
    </Select>
  );
};

const Select = styled.select`
  border-color: ${neutral[200]};
  padding: 0.5rem;
`;

const Option = styled.option``;

export default Sort;

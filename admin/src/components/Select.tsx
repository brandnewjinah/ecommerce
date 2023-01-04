import React, { FC } from "react";
import styled from "styled-components";

//comp
import { neutral } from "./token";

//interface
import { SelectProps } from "../interfaces/componentInterface";

const Select: FC<SelectProps> = ({
  options,
  onChange,
  selected,
  fullWidth,
}) => {
  return (
    <SelectWrapper>
      <SelectInput
        fullWidth={fullWidth}
        defaultValue={selected}
        onChange={onChange}
      >
        <option disabled selected>
          -- select an option --
        </option>
        {options &&
          options.map((option, idx) => (
            <option key={idx} value={idx} selected={selected === option.value}>
              {option.label}
            </option>
          ))}
      </SelectInput>
    </SelectWrapper>
  );
};

const SelectWrapper = styled.div`
  position: relative;

  &:after {
    content: "⌄";
    font-size: 1rem;
    top: 7px;
    right: 0.875rem;
    position: absolute;
  }
`;

const SelectInput = styled.select<SelectProps>`
  -webkit-appearance: none;
  appearance: none;
  font-size: 1rem;
  border-color: ${neutral[200]};
  border-radius: 0.25rem;
  padding: 0.875rem 0.75rem;
  width: ${(props) => props.fullWidth && "100%"};
`;

export default Select;

import React, { ChangeEvent, FC, useState } from "react";
import styled from "styled-components";

//comp
import { Body } from "./Text";
import { neutral } from "./token";

interface Data {
  type?: string;
  desc?: string;
}

interface Props {
  name?: string;
  defaultValue?: string;
  data?: Data[];
  handleSelected?: (el: string) => void;
}

const Radio: FC<Props> = ({ name, data, defaultValue, handleSelected }) => {
  const [selection, setSelection] = useState(defaultValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelection(e.target.value);
    handleSelected?.(e.target.value);
  };

  return (
    <>
      {data &&
        data.map((item, idx) => (
          <SelectorContainer key={idx}>
            <input
              type="radio"
              value={item.type}
              name={name}
              checked={selection === item.type}
              onChange={(e) => handleChange(e)}
            />
            <div className="desc">
              <Body variant="body_small">{`${item.type} Shipping`}</Body>
              <Body variant="body_small" color={neutral[300]}>
                {item.desc}
              </Body>
            </div>
          </SelectorContainer>
        ))}
    </>
  );
};

const SelectorContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${neutral[200]};
  padding: 1rem 1.5rem;
  margin: 0.875em 0;

  .desc {
    margin-left: 2em;
  }
`;

export default Radio;

import React, { useState } from "react";
import styled from "styled-components";

import { neutral } from "./token";

const Selector = ({ name, data, defaultValue, handleSelected }) => {
  const [selection, setSelection] = useState(defaultValue);

  const handleChange = (e) => {
    setSelection(e.target.value);
    handleSelected(e.target.value);
  };

  return (
    <>
      {data.map((item, idx) => (
        <SelectorContainer key={idx}>
          <input
            type="radio"
            value={item.type}
            name={name}
            checked={selection === item.type}
            onChange={(e) => handleChange(e)}
          />
          <div className="desc">
            <p>{item.desc}</p>
            <p>{`${item.type} Shipping`}</p>
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
  padding: 1.5em;
  margin: 0.875em 0;

  p {
    color: ${neutral[600]};
    line-height: 1.25rem;

    &:last-child {
      color: ${neutral[300]};
    }
  }

  .desc {
    margin-left: 2em;
  }
`;

export default Selector;

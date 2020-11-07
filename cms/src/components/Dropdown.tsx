import React, { FC, useEffect, useState } from "react";

//import styles and assets
import styled from "styled-components";
import { ChevronDown } from "../assets/Icons";

interface Category {
  name: string;
  subcategory: [];
}

interface Props {
  data: Category[];
  select?: string;
  handleSelection: (item: string) => void;
}

const Dropdown: FC<Props> = ({ data, select, handleSelection }) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<string | undefined>(select);

  useEffect(() => {
    setSelected(select);
  }, [select]);

  const handleSelect = (item: string) => {
    setSelected(item);
    handleSelection(item);
    setVisible(!visible);
  };

  return (
    <Wrapper>
      <Label onClick={() => setVisible(!visible)}>
        <div>{selected}</div>
        <div>
          <IconContainer
            style={
              visible
                ? { transform: `rotate(180deg)` }
                : { transform: `rotate(0deg)` }
            }
          >
            <ChevronDown width="14" height="14" color="#000" stroke="2" />{" "}
          </IconContainer>
        </div>
      </Label>
      {visible ? (
        <DropdownContent>
          <ul>
            {data.map((d, idx) => (
              <li key={idx} onClick={() => handleSelect(d.name)}>
                <div>{d.name}</div>
              </li>
            ))}
          </ul>
        </DropdownContent>
      ) : null}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  border: 1px solid #e4e4e4;
  border-radius: 0.25em;
`;

const Label = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75em 2em;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: center;
  transition: all 0.3s;
`;

const DropdownContent = styled.div`
  width: 100%;
  position: relative;
  z-index: 10;

  ul {
    width: 100%;
    background-color: white;
    border: 1px solid #e4e4e4;
    position: absolute;
    padding: 0.75em 2em;
  }
`;

export default Dropdown;

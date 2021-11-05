import React, { FC } from "react";

interface Props {
  id?: string;
  name?: any;
  handleSelect?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
}

const Checkbox: FC<Props> = ({ id, name, handleSelect, checked }) => {
  return (
    <input
      id={id}
      name={name}
      type="checkbox"
      checked={checked}
      onChange={handleSelect}
    />
  );
};

export default Checkbox;

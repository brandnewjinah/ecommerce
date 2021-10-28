import React, { FC } from "react";

interface Props {
  id?: string;
  name?: any;
  handleClick?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isChecked?: boolean;
}

const Checkbox: FC<Props> = ({ id, name, handleClick, isChecked }) => {
  return (
    <input
      id={id}
      name={name}
      type="checkbox"
      onChange={handleClick}
      checked={isChecked}
    />
  );
};

export default Checkbox;

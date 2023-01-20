import React, { FC } from "react";
import styled from "styled-components";
import { neutral } from "./token";

interface Props {
  title: string;
  value?: string;
  className?: string;
}

const TextBlock: FC<Props> = ({ title, value, className }) => {
  return (
    <Block className={className}>
      <p className="title">{title}</p>
      <p className="value">{value}</p>
    </Block>
  );
};

const Block = styled.div`
  .title {
    font-size: 0.875rem;
    color: ${neutral[500]};
  }

  .value {
    font-weight: 600;
    padding-top: 0.5rem;
  }
`;

export default TextBlock;

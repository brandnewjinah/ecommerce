import React, { FC } from "react";
import styled from "styled-components";
import { fontSize, neutral } from "./token";

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
    font-size: ${fontSize.sm2};
    color: ${neutral[500]};
    font-weight: 500;
  }

  .value {
    font-weight: 600;
    padding: 0.5rem 0;
  }
`;

export default TextBlock;

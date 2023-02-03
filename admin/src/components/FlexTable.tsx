import React, { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Flex } from "./containers/Div";
import { colors, neutral } from "./token";

interface Key {
  name: string;
  width: string;
}

interface Props {
  data: any;
  keys: Key[];
  param?: string;
  className?: string;
}

interface SpanProps {
  status?: string;
}

const FlexTable: FC<Props> = ({ data, keys, param, className }) => {
  return (
    <Table>
      <Flex>
        {keys &&
          keys.map((key, idx) => (
            <TH className={key.width} key={idx}>
              {key.name}
            </TH>
          ))}
      </Flex>
      <div>
        {data.map((item: { name: string; width: string }[], idx: number) => (
          <TR key={idx}>
            {item.map((it: any, idx: number) => (
              <div key={idx} className={it.width}>
                {idx === 0 ? (
                  <Link to={`/${param}/${it.value}`}>
                    <Span status={it.value}>{`...${it.value.slice(-5)}`}</Span>
                  </Link>
                ) : (
                  <Span status={it.value}>{it.value}</Span>
                )}
              </div>
            ))}
          </TR>
        ))}
      </div>
    </Table>
  );
};

const Table = styled.div`
  display: table;
  color: ${neutral[700]};
`;

const TH = styled.span`
  display: table-header-group;
  font-size: 0.75rem;
  color: ${neutral[300]};
  line-height: 2rem;
  text-transform: uppercase;
  font-weight: 700;
  border-bottom: 1px solid ${neutral[200]};
`;

const TR = styled.div`
  display: flex;
  font-size: 0.875rem;
  border-bottom: 1px solid ${neutral[100]};
  padding: 1rem 0;
`;

const Span = styled.span<SpanProps>`
  background-color: ${(props) =>
    props.status === "Order Placed" && colors.lightGreen};
  color: ${(props) => props.status === "Order Placed" && colors.green};
  font-weight: ${(props) => props.status === "Order Placed" && 500};
  padding: ${(props) => props.status === "Order Placed" && "0.25rem .5rem"};
  border-radius: ${(props) => props.status === "Order Placed" && ".25rem"};
`;

export default FlexTable;

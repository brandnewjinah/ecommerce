import React, { FC } from "react";
import styled from "styled-components";

import { Flex } from "./containers/Div";
import { neutral } from "./token";

interface Key {
  name: string;
  width: string;
}

interface Props {
  data: any;
  keys: Key[];
  showId?: boolean;
  className?: string;
}

const FlexTable: FC<Props> = ({ data, keys, showId, className }) => {
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
            {!showId
              ? item.slice(1).map((it: any, idx: number) => (
                  <span key={idx} className={it.width}>
                    {it.value}
                  </span>
                ))
              : item.map((it: any, idx: number) => (
                  <span key={idx} className={it.width}>
                    {it.value}
                  </span>
                ))}
          </TR>
        ))}
      </div>
    </Table>
  );
};

const Table = styled.div`
  display: table;
  color: ${neutral[500]};
`;

const TH = styled.span`
  display: table-header-group;
  font-size: 0.75rem;
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

export default FlexTable;

import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

//comp
import { Section } from "../containers/Section";
import { Div, Flex } from "../containers/Div";
import { neutral } from "../token";
import { Body } from "../Text";
import ImageContainer from "../ImageContainer";
import { IconButton } from "../Button";
import { ChevronRight } from "../../assets/Icon";

interface Props {
  id: string;
  date: string;
  status: string;
  total: number;
  thumb?: string;
}

const OrderCard: FC<Props> = ({ id, date, status, total, thumb }) => {
  const navigate = useNavigate();

  return (
    <Section bgColor={neutral[50]} padding="2rem">
      <Flex>
        <Div width="15%">
          <ImageContainer imgUrl={thumb} />
        </Div>
        <Div width="70%" gap="1rem">
          <Flex margin="0 0 1.5rem 0">
            <div className="flexTwo">
              <Body
                variant="caption"
                color={neutral[500]}
                uppercase
                spacing=".05rem"
              >
                Order Number
              </Body>
              <Body variant="body_small">{id}</Body>
            </div>
            <div className="flexOne">
              <Body
                variant="caption"
                color={neutral[500]}
                uppercase
                spacing=".05rem"
              >
                Order Date
              </Body>
              <Body variant="body_small">{moment(date).format("LL")}</Body>
            </div>
          </Flex>
          <Flex>
            <div className="flexTwo">
              <Body
                variant="caption"
                color={neutral[500]}
                uppercase
                spacing=".05rem"
              >
                Order Status
              </Body>
              <Body variant="body_small">{status}</Body>
            </div>
            <div className="flexOne">
              <Body
                variant="caption"
                color={neutral[500]}
                uppercase
                spacing=".05rem"
              >
                Total
              </Body>
              <Body variant="body_small">{`$${total}`}</Body>
            </div>
          </Flex>
        </Div>
        <Div>
          <IconButton
            icon={
              <ChevronRight width={20} height={20} color="#000" stroke={2} />
            }
            handleClick={() => navigate(`../orders/${id}`)}
          />
        </Div>
      </Flex>
    </Section>
  );
};

export default OrderCard;

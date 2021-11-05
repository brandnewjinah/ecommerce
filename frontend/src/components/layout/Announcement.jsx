import React from "react";
import styled from "styled-components";
import { typeScale } from "../token";

const Announcement = () => {
  return <Wrapper>Announcement</Wrapper>;
};

const Wrapper = styled.div`
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${typeScale.caption};
  font-weight: 700;
  letter-spacing: 0.05rem;
  color: #fff;
  text-transform: uppercase;
  background-color: #d0af8f;
`;

export default Announcement;

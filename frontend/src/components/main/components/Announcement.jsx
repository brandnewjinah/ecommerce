import React from "react";
import styled from "styled-components";
import { primaryColor, typeScale } from "../../token";

const Announcement = () => {
  return <Container>Enjoy Free Shipping on Orders Over $30</Container>;
};

const Container = styled.div`
  background-color: ${primaryColor.button};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${typeScale.sbody};
  font-weight: 500;
  padding: 0.5rem 0;
`;

export default Announcement;

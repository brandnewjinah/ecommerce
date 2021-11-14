import React from "react";
import styled from "styled-components";
import { neutral, primaryColor, typeScale } from "./token";

const Newsletter = () => {
  return (
    <Container>
      <Wrapper>
        <Title>Newsletter</Title>
        <Desc>
          Sign up to enjoy free U.S. shipping and returns on your first order.
        </Desc>
        <InputContainer>
          <Input placeholder="Email address" />
          <Button>{/* <Send /> */}</Button>
        </InputContainer>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  padding: 2.5rem;
`;

const Wrapper = styled.div`
  background-color: ${neutral[100]};
  height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h1`
  margin-bottom: 1.25rem;
`;

const Desc = styled.div`
  font-size: ${typeScale.body};
`;

const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
`;

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`;

const Button = styled.button`
  flex: 1;
  border: none;
  background-color: ${primaryColor.button};
  color: white;
`;

export default Newsletter;

import React from "react";
import styled from "styled-components";
import { Button } from "./Button";
import { breakpoint, neutral, primaryColor, typeScale } from "./token";

const Newsletter = () => {
  return (
    <Container>
      <Wrapper>
        <Title>
          <h2>Stay Tuned</h2>
          <p>
            Sign up to enjoy free U.S. shipping and returns on your first order.
          </p>
        </Title>
        <InputContainer>
          <Input placeholder="Email address" />
          <Button label="Subscribe" color={primaryColor.button} size="small" />
        </InputContainer>
      </Wrapper>
    </Container>
  );
};

const Container = styled.section`
  padding: 2.5rem;
`;

const Wrapper = styled.div`
  background-color: ${neutral[100]};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 2.5rem;
`;

const Title = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;

  h2 {
    text-transform: uppercase;
    margin-bottom: 1.25rem;
  }
`;

const InputContainer = styled.div`
  display: flex;
  gap: 0.25rem;
  justify-content: space-between;

  @media ${breakpoint.lg} {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const Input = styled.input`
  border: none;
  /* flex: 9; */
  border-radius: 0.25rem;
  padding: 0.75rem;
  appearance: none;

  &:focus {
    box-shadow: 0 0 0 2px rgba(0, 125, 250, 0.6);
    border-radius: 0.25rem;
    outline: none;
  }
`;

export default Newsletter;

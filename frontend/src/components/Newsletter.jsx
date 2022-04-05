import React, { useState, useEffect } from "react";
import styled from "styled-components";

//comp
import Header from "./Header";
import Text from "./Text";
import { Section } from "./Container";
import { Button } from "./Button";
import { breakpoint, neutral, primaryColor } from "./token";

//redux
import { useDispatch, useSelector } from "react-redux";
import { addSubscriber } from "../redux/subscriberRedux";
import { reset } from "../redux/subscriberRedux";

const Newsletter = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState({ email: "" });

  const handleChange = ({ currentTarget: input }) => {
    const newEmail = { ...email };
    newEmail.email = input.value;
    setEmail(newEmail);
  };

  const { isSuccess, isError, message } = useSelector(
    (state) => state.subscriber
  );

  useEffect(() => {
    if (isError) {
      alert(message);
      setEmail({ email: "" });
    }

    if (isSuccess) {
      alert("You're subscribed!");
      dispatch(reset());
      window.location.reload();
    }
  }, [isSuccess, isError, message, dispatch]);

  const handleSubscribe = () => {
    dispatch(addSubscriber(email));
  };

  return (
    <Section padding="2.5rem 0">
      <Wrapper>
        <Header title="Stay Tuned" />
        <Title>
          <Text variant="body_small">
            Sign up to receive offers and enjoy free U.S. shipping and returns
            on your first order.
          </Text>
        </Title>
        <InputContainer>
          <Input placeholder="Email address" onChange={handleChange} />
          <Button
            label="Subscribe"
            color={primaryColor.button}
            size="small"
            handleClick={handleSubscribe}
          />
        </InputContainer>
      </Wrapper>
    </Section>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${neutral[100]};
  padding: 3rem;
`;

const Title = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 0.25rem;
  justify-content: space-between;
  padding: 1rem 0;

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

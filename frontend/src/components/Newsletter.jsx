import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "./Button";
import { breakpoint, fontScale, neutral, primaryColor } from "./token";

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
  }, [isSuccess, isError, dispatch]);

  const handleSubscribe = () => {
    dispatch(addSubscriber(email));
  };

  return (
    <Container>
      <Wrapper>
        <Title>
          <h2>Stay Tuned</h2>
          <p>
            Sign up to receive offers and enjoy free U.S. shipping and returns
            on your first order.
          </p>
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
    </Container>
  );
};

const Container = styled.section`
  padding: 2.5rem 0;
`;

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

  h2 {
    font-size: ${fontScale.scale_b3};
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.03rem;
    position: relative;
    padding-bottom: 1.25rem;
    margin-bottom: 1.75rem;

    &:after {
      content: "";
      margin: auto;
      width: 30px;
      height: 3px;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: #000;
      opacity: 0.2;
    }
  }

  p {
    font-size: ${fontScale.scale_s2};
  }
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

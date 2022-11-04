import React, { useState, useEffect } from "react";
import styled from "styled-components";

//comp
import Header from "./Header";
import { Body } from "./Text";
import { Button } from "./Button";
import { breakpoint, neutral, primaryColor } from "./token";

//redux
import { useDispatch, useSelector } from "react-redux";
import { addSubscriber } from "../redux/subscriberRedux";
import { reset } from "../redux/subscriberRedux";
import { Flex } from "./containers/Divs";
import { Input } from "./Input";

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
    <Flex
      flexCol
      justifyContent="center"
      width="100%"
      bgColor={neutral[100]}
      padding="3rem"
    >
      <Header title="Stay Tuned" />
      <Body variant="body_small" align="center">
        Sign up to receive offers and enjoy free U.S. shipping and returns on
        your first order.
      </Body>
      <Flex gap="0.25rem" padding="1rem 0" lgFlexCol>
        {/* <Input /> */}
        {/* <Input placeholder="Email address" onChange={handleChange} /> */}
        <Button
          label="Subscribe"
          color={primaryColor.button}
          size="small"
          handleClick={handleSubscribe}
        />
      </Flex>
    </Flex>
  );
};

// const Input = styled.input`
//   border: none;
//   /* flex: 9; */
//   border-radius: 0.25rem;
//   padding: 0.75rem;
//   appearance: none;

//   &:focus {
//     box-shadow: 0 0 0 2px rgba(0, 125, 250, 0.6);
//     border-radius: 0.25rem;
//     outline: none;
//   }
// `;

export default Newsletter;

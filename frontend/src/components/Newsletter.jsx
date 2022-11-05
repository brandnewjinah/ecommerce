import React, { useState, useEffect } from "react";

//comp
import Header from "./Header";
import { Body } from "./Text";
import { TextInput } from "./TextInput";
import { Flex } from "./containers/Divs";
import { Button, IconButton } from "./Button";
import { neutral, primaryColor } from "./token";

//redux
import { useDispatch, useSelector } from "react-redux";
import { addSubscriber } from "../redux/subscriberRedux";
import { reset } from "../redux/subscriberRedux";
import { ChevronRight } from "../assets/Icon";

const Newsletter = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState({ email: "" });

  const handleChange = ({ currentTarget: input }) => {
    const newEmail = { ...email };
    newEmail.email = input.value;
    setEmail(newEmail);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      console.log("submit");
    }
  };

  const handleSubmit = () => {
    console.log("submit");
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
      <Flex width="100%" maxWidth="400px" bgColor="#fff" margin="2rem 0 0">
        <TextInput
          placeholder="Email address"
          onChange={handleChange}
          onKeyPress={handleEnter}
        />
        <IconButton
          icon={<ChevronRight width={20} height={20} color="#000" stroke={2} />}
          handleClick={handleSubmit}
        />
      </Flex>
    </Flex>
  );
};

export default Newsletter;

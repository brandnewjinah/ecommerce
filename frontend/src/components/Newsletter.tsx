import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";

//comp
import Header from "./Header";
import { Body } from "./Text";
import { TextInput } from "./TextInput";
import { Flex } from "./containers/Div";
import { IconButton } from "./Button";
import { neutral } from "./token";
import { ChevronRight } from "../assets/Icon";

//redux
import { useDispatch, useSelector } from "react-redux";
import { addSubscriber } from "../redux/subscriberRedux";
import { RootState } from "../redux/store";
import { reset } from "../redux/subscriberRedux";

const Newsletter = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState({ email: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail({ email: e.target.value });
  };

  const handleEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      dispatch(addSubscriber(email));
    }
  };

  const handleSubmit = () => {
    dispatch(addSubscriber(email));
  };

  const { status, message } = useSelector(
    (state: RootState) => state.subscriber
  );

  //actions after submitting data
  useEffect(() => {
    if (status === 201) {
      alert("You're subscribed!");
      dispatch(reset());
      window.location.reload();
    } else if (status === 406 || status === 400) {
      alert(message);
      dispatch(reset());
      window.location.reload();
    }
  }, [dispatch, status, message]);

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

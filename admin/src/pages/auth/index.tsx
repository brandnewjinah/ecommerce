import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";

//comp
import { Div, Flex } from "../../components/containers/Div";
import { Section } from "../../components/containers/Section";
import { Header } from "../../components/Header";
import { Body } from "../../components/Text";
import { TextInput } from "../../components/TextInput";
import { Button } from "../../components/Button";
import { neutral, primaryColor } from "../../components/token";

//others
import { AuthIF } from "../../interfaces/authInterface";
import { signinValidate } from "../../utils/validate";

//redux
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../redux/authReducer";
import { RootState } from "../../redux/store";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<AuthIF>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const userInput = { ...admin };
    userInput[name as keyof AuthIF] = value;
    setAdmin(userInput);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = signinValidate(admin);
    setErrors(errors || {});
    if (errors) return;

    dispatch(signin(admin));
  };

  const { status, message, currentUser } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (status === 200 && currentUser.isAdmin) {
      navigate("/home");
    } else if (status === 200 && !currentUser.isAdmin) {
      alert("You're not authorized");
    } else if (status !== 0) {
      alert(message);
    }
  }, [status, message, currentUser, dispatch]);

  return (
    <Flex height="100vh">
      <Div width="450px" margin="0 auto">
        <Header
          title="Admin Page"
          body="Please sign in to access the admin panel"
          textAlign="center"
        />

        <form onSubmit={handleSubmit}>
          <Section gap="1rem" padding="1rem" margin="1rem 0">
            <Div width="100%" bgColor={neutral[100]} padding="1rem">
              <Body variant="body_xsmall" color={neutral[500]}>
                email: <b>admin@admin.com</b> / password: <b>admin</b>
              </Body>
            </Div>
            <TextInput
              name="email"
              placeholder="email"
              error={errors.email}
              onChange={handleInputChange}
            />
            <TextInput
              name="password"
              placeholder="Password"
              type="password"
              error={errors.password}
              onChange={handleInputChange}
            />
            <Button label="Sign In" color={primaryColor.button} type="submit" />
            <Body variant="body_small" color={neutral[400]} align="center">
              Don't have an admin access? Please talk to your team leader.
            </Body>
          </Section>
        </form>
      </Div>
    </Flex>
  );
};

export default Auth;

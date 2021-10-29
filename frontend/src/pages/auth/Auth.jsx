import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import styled from "styled-components";

//comp
import { Input } from "../../components/Input2";
import { Button } from "../../components/Button";

//token
import { primaryColor, typeScale, neutral } from "../../components/token";

//redux
import { signin, signup } from "../../reducers/authReducer";

const Auth = (props) => {
  const [isSignup, setIsSignup] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSwitch = () => {
    setIsSignup((prev) => !prev);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj; //? does not throw an error
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });
      history.push("/home");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In Failed");
  };

  const validate = Yup.object({
    ...(isSignup && {
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Name is required"),
    }),
    email: Yup.string()
      .email("Must be a valid email form")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    ...(isSignup && {
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Password must match")
        .required("Confirm password is required"),
    }),
  });

  const handleSubmit = (values) => {
    if (isSignup) {
      dispatch(signup(values, history));
    } else {
      dispatch(signin(values, history));
    }
  };
  return (
    <Container>
      <h2>{isSignup ? "Create an account" : "Sign In"}</h2>
      <Formik
        initialValues={user}
        validationSchema={validate}
        onSubmit={(values) => handleSubmit(values)}
      >
        {(formik) => (
          <Form>
            {isSignup && <Input name="name" placeholder="Name" />}
            <Input name="email" placeholder="Email" type="email" />
            <Input name="password" placeholder="Password" type="password" />
            {isSignup && (
              <Input
                name="confirmPassword"
                placeholder="Confirm Password"
                type="password"
              />
            )}
            <Button
              label={isSignup ? "Sign Up" : "Sign In"}
              color={primaryColor.button}
              type="submit"
            />
          </Form>
        )}
      </Formik>
      <GoogleLogin
        clientId="670096274955-v4f3kamrodgbqhnqs8i64t22g4m0iqg7.apps.googleusercontent.com"
        render={(props) => (
          <Button
            label="Google Login"
            color={neutral[300]}
            type="submit"
            handleClick={props.onClick}
          />
        )}
        onSuccess={googleSuccess}
        onFailure={googleFailure}
        coookiePolicy="single_host_origin"
      />

      <Button
        fontColor={neutral[300]}
        label={
          isSignup
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"
        }
        shape="text"
        handleClick={handleSwitch}
      />
    </Container>
  );
};

const Container = styled.div``;

const Redirect = styled.div`
  display: flex;
  font-size: ${typeScale.sbody};
  color: ${neutral[400]};
  margin-top: 1rem;

  .link {
    margin-left: 0.25rem;
    text-decoration: underline;
    cursor: pointer;
  }
`;

export default Auth;

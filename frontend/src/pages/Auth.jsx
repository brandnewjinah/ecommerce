import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { useHistory, useLocation } from "react-router-dom";

import { GoogleLogin } from "react-google-login";
import styled from "styled-components";

//comp
import { Header } from "../components/layout/Header";
import { Input } from "../components/Input";
import { Button, TextButton } from "../components/Button";

//token
import { primaryColor, neutral, breakpoint } from "../components/token";
import { Google } from "../assets/Icon";

//redux
import { useDispatch, useSelector } from "react-redux";
import { signin, signup, signout } from "../redux/authRedux";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validate),
  });

  const history = useHistory();
  const location = useLocation();
  const _id = history.location.state && history.location.state._id;

  const path = location.pathname;
  const redirect = location.search.split("redirectTo=")[1];
  const dispatch = useDispatch();

  const user = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

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

  const { isLoading, isSuccess, isError, message, currentUser } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      alert(message);
      dispatch(signout());
    }

    if (isSuccess) {
      history.push("/home");
    }
  }, [isSuccess, isError, message, currentUser, dispatch]);

  const onSubmit = (data) => {
    if (isSignup) {
      dispatch(signup(data));
      // path === "/cart" ? history.push("/checkout") : history.push("/home");
    } else {
      dispatch(signin(data));
      // error === null && redirect
      //   ? history.push(`/${redirect}`, { _id })
      //   : error === null && history.push("/home");
      // console.log(error);
      //null 이 먼저 찍힘
    }
  };
  return (
    <Container>
      <Header title={isSignup ? "Create an account" : "Sign In"} />

      <form onSubmit={handleSubmit(onSubmit)}>
        {isSignup && (
          <Input
            name="name"
            placeholder="Name"
            register={register}
            type="text"
            required
            errors={errors}
          />
        )}
        <Input
          name="email"
          placeholder="Email"
          register={register}
          type="email"
          required
          errors={errors}
        />
        <Input
          name="password"
          placeholder="Password"
          register={register}
          type="password"
          required
          errors={errors}
        />
        {isSignup && (
          <Input
            name="confirmPassword"
            placeholder="Confirm Password"
            register={register}
            type="password"
            required
            errors={errors}
          />
        )}
        <Button
          label={isSignup ? "Sign Up" : "Sign In"}
          color={primaryColor.button}
          type="submit"
          margin="1rem 0"
        />
      </form>

      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_AUTH}
        render={(props) => (
          <Button
            label="Google Login"
            shape="outline"
            color={neutral[300]}
            fontColor={neutral[400]}
            type="submit"
            icon={<Google width={16} height={16} fill={neutral[400]} />}
            handleClick={props.onClick}
          />
        )}
        onSuccess={googleSuccess}
        onFailure={googleFailure}
        coookiePolicy="single_host_origin"
      />
      <TextButton
        color={neutral[300]}
        label={
          isSignup
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"
        }
        padding="1.25rem 0 0"
        center
        handleClick={handleSwitch}
      />
    </Container>
  );
};

const Container = styled.div`
  max-width: 400px;
  padding: 2rem 1.5rem;
  margin: 0 auto;

  @media ${breakpoint.lg} {
    width: 100%;
  }
`;

export default Auth;

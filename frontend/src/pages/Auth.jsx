import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GoogleLogin } from "react-google-login";

//comp
import { Heading } from "../components/Text";
import { Section } from "../components/containers/Section";
import { Div } from "../components/containers/Div";
import { TextInput } from "../components/TextInput";
import { Button, TextButton } from "../components/Button";
import { primaryColor, neutral } from "../components/token";
import { Google } from "../assets/Icon";

//util
import { signinValidate, signupValidate } from "../utils/validate";

//redux
import { useDispatch, useSelector } from "react-redux";

import { signin, signup, signout } from "../redux/authRedux";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isSignup, setIsSignup] = useState(false);

  const [errors, setErrors] = useState({});

  const handleSwitch = () => {
    setIsSignup((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const userInput = { ...user };
    userInput[name] = value;
    setUser(userInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      const errors = signupValidate(user);
      setErrors(errors || {});
      if (errors) return;

      dispatch(signup(user));
    } else {
      const errors = signinValidate(user);
      setErrors(errors || {});
      if (errors) return;

      dispatch(signin(user));
    }

    // if (isSignup) {
    //   dispatch(signup(user));
    //   // path === "/cart" ? history.push("/checkout") : history.push("/home");
    // } else {
    //   dispatch(signin(user));
    //   // error === null && redirect
    //   //   ? history.push(`/${redirect}`, { _id })
    //   //   : error === null && history.push("/home");
    // }
  };

  // const _id = navigate.location.state && navigate.location.state._id;

  const path = location.pathname;
  const redirect = location.search.split("redirectTo=")[1];
  const dispatch = useDispatch();

  const googleSuccess = async (res) => {
    const result = res?.profileObj; //? does not throw an error
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In Failed");
  };

  const { status, message, currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (status !== 200 && status !== 0) {
      alert(message);
      // dispatch(signout());
    }

    if (status === 200) {
      navigate("/home");
    }
  }, [status, message, currentUser, dispatch]);

  return (
    <Div maxWidth="400px" margin="0 auto">
      <Heading title={isSignup ? "Create an account" : "Sign In"} />
      <form onSubmit={handleSubmit}>
        <Section gap="1rem">
          {isSignup && (
            <TextInput
              name="name"
              placeholder="Name"
              error={errors.name}
              onChange={handleInputChange}
            />
          )}
          <TextInput
            name="email"
            placeholder="Email"
            type="email"
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

          {isSignup && (
            <TextInput
              name="confirmPassword"
              placeholder="Confirm Password"
              type="password"
              error={errors.confirmPassword}
              onChange={handleInputChange}
            />
          )}
          <Button
            label={isSignup ? "Sign Up" : "Sign In"}
            color={primaryColor.button}
            type="submit"
          />
        </Section>
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
            margin="1rem 0 0"
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
    </Div>
  );
};

export default Auth;

import React, { useState } from "react";
import axios from "axios";

//import styles and assets
import styled from "styled-components";
import { Button } from "../../components/Button";

//import components

import Input from "../../components/Input";

const Login = (props) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = ({ currentTarget: input }) => {
    const userInput = { ...data };
    userInput[input.name] = input.value;
    setData(userInput);
  };

  const validate = () => {
    const errors = {};
    if (data.email === "") {
      errors.email = "Email address is required";
    }
    if (data.password === "") {
      errors.password = "Password is required";
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors || {});
    if (errors) return;
    postData();
  };

  const postData = async () => {
    const user = {
      email: data.email,
      password: data.password,
    };

    await axios
      .post("http://localhost:5000/user/login", user)
      .then((res) => {
        if (res.status === 200) {
          const token = res.data.token;
          localStorage.setItem("token", token);
          window.location = "/";
          alert("Logged in successfully");
        }
      })
      .catch((err) => {
        // if (
        //   err.response &&
        //   err.response.status >= 400 &&
        //   err.response.status < 500
        // )
        alert("Wrong email or password");
      });
  };

  return (
    <Wrapper>
      <Container>
        <h4>Login</h4>
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="text"
            name="email"
            value={data.email}
            error={errors.email}
            handleChange={handleChange}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={data.password}
            error={errors.password}
            handleChange={handleChange}
          />
          <Button label="Login" />
        </form>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;

const Container = styled.div`
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
`;

export default Login;

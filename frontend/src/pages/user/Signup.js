import React, { useState } from "react";
import axios from "axios";

//import styles and assets
import styled from "styled-components";
import { Button } from "../../components/Button";

//import components

import Input from "../../components/Input";

const Signup = (props) => {
  const [data, setData] = useState({
    email: "",
    name: "",
    password: "",
    confirmpw: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = ({ currentTarget: input }) => {
    const userInput = { ...data };
    userInput[input.name] = input.value;
    setData(userInput);
  };

  const validate = () => {
    const errors = {};
    if (data.name === "") {
      errors.name = "Name is required";
    }
    if (!data.email.match(/@/)) {
      errors.email = "Not a valid email address";
    }
    if (data.email === "") {
      errors.email = "Email address is required";
    }
    if (!data.password.match(/.{8}/)) {
      errors.password = "Password must be at least 8 characters long";
    }
    if (data.password === "") {
      errors.password = "Password is required";
    }
    if (data.password !== data.confirmpw || data.confirmpw === "") {
      errors.confirmpw = "Password does not match";
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
      name: data.name,
      email: data.email,
      password: data.password,
    };

    await axios
      .post("http://localhost:5000/user/signup", user)
      .then((res) => {
        if (res.status === 200) {
          props.history.push("/login");
          alert("User Registered successfully");
        }
      })
      .catch((err) => {
        // if (
        //   err.response &&
        //   err.response.status >= 400 &&
        //   err.response.status < 500
        // )
        alert(err);
      });
  };

  return (
    <Wrapper>
      <Container>
        <h4>Signup</h4>
        <form onSubmit={handleSubmit}>
          <Input
            label="Name"
            type="text"
            name="name"
            value={data.name}
            error={errors.name}
            handleChange={handleChange}
          />
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
          <Input
            label="Confirm Password"
            type="password"
            name="confirmpw"
            value={data.confirmpw}
            error={errors.confirmpw}
            handleChange={handleChange}
          />
          <Button label="Signup" />
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

export default Signup;

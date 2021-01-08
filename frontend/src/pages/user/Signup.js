import React, { useState } from "react";
import axios from "axios";

//import components
import { Button } from "../../components/Button";
import Input from "../../components/Input";

//import styles and assets
import styled from "styled-components";
import colors from "../../components/Colors";

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
          <div className="item">
            <Input
              placeholder="Name"
              type="text"
              name="name"
              value={data.name}
              error={errors.name}
              handleChange={handleChange}
            />
          </div>
          <div className="item">
            <Input
              placeholder="Email"
              type="text"
              name="email"
              value={data.email}
              error={errors.email}
              handleChange={handleChange}
            />
          </div>
          <div className="item">
            <Input
              placeholder="Password"
              type="password"
              name="password"
              value={data.password}
              error={errors.password}
              handleChange={handleChange}
            />
          </div>
          <div className="item">
            <Input
              placeholder="Confirm Password"
              type="password"
              name="confirmpw"
              value={data.confirmpw}
              error={errors.confirmpw}
              handleChange={handleChange}
            />
          </div>
          <Button label="Signup" type="fill" color="#266150" />
        </form>
        <Section>
          <div className="flex">
            <p>Already have an account?</p>
            <p className="link" onClick={() => props.goToSignin()}>
              Login
            </p>
          </div>
        </Section>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 1em;
`;

const Container = styled.div`
  width: 100%;
  min-width: 340px;
  margin: 1em auto 2em;

  h4 {
    text-align: center;
  }

  .item {
    margin: 1.5em 0;
  }
`;

const Section = styled.div`
  margin: 1em 0;

  .flex {
    display: flex;
    justify-content: center;
    font-size: 0.875rem;
    text-align: center;
    color: ${colors.darkgray};
    margin: 1em 0;
  }

  .link {
    margin-left: 0.25em;
    text-decoration: underline;
    cursor: pointer;
  }

  .btn {
    display: flex;
    justify-content: space-between;
  }

  .each {
    flex: 0 1 49%;
  }
`;

export default Signup;

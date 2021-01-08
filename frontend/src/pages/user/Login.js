import React, { useState } from "react";

//import libraries
import axios from "axios";

//import components
import Input from "../../components/Input";

//import styles and assets
import styled from "styled-components";
import { Button } from "../../components/Button";
import colors from "../../components/Colors";

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
          <Button label="Login" type="fill" color="#266150" />
        </form>
        <Section>
          <div className="btn">
            <div className="each">
              <Button
                label="Google"
                type="fill"
                color={colors.lightgray}
                fontcolor={colors.darkgray}
                logo="google"
              />
            </div>
            <div className="each">
              <Button
                label="Facebook"
                type="fill"
                color={colors.lightgray}
                fontcolor={colors.darkgray}
                logo="facebook"
              />
            </div>
          </div>
        </Section>
        <Section>
          <div className="flex">
            <p>Don't have an accout?</p>
            <p className="link" onClick={() => props.goToSignup()}>
              Signup
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

  @media (max-width: 445) {
    min-width: 100;
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

export default Login;

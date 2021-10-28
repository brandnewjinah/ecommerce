import React, { useState } from "react";

//import libraries
import axios from "axios";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

//import components
import { Section } from "../../components/layout/Container";
import Input from "../../components/Input";

//import styles and assets
import styled from "styled-components";
import { Button } from "../../components/Button";
import colors from "../../components/Colors";

//redux
import { connect } from "react-redux";
import { loginUser } from "../../reducers/authReducer";

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

    props.loginUser(user);
    // await axios
    //   .post("http://localhost:5000/user/login", user)
    //   .then((res) => {
    //     if (res.status === 200) {
    //       const token = res.data.token;
    //       localStorage.setItem("token", token);
    //       window.location = "/";
    //       alert("Logged in successfully");
    //     }
    //   })
    //   .catch((err) => {
    //     // if (
    //     //   err.response &&
    //     //   err.response.status >= 400 &&
    //     //   err.response.status < 500
    //     // )
    //     alert("Wrong email or password");
    //   });
  };

  return (
    <Container>
      <Wrapper>
        <h4>Login</h4>
        <form>
          <Input
            placeholder="Email"
            type="text"
            name="email"
            value={data.email}
            error={errors.email}
            handleChange={handleChange}
          />
          <Input
            placeholder="Email"
            type="text"
            name="email"
            value={data.email}
            error={errors.email}
            handleChange={handleChange}
          />
          <Button label="Login" color="#266150" />
        </form>
        <Section>
          <div className="flex">
            <p>Don't have an accout?</p>
            <p className="link" onClick={() => props.goToSignup()}>
              Signup
            </p>
          </div>
        </Section>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 1em;
`;

const Wrapper = styled.div`
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

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loginUser })(Login);

import React, { useState } from "react";
import { Formik } from "formik";
import styled from "styled-components";

//import components
import Input from "../../components/Input";

//import styles and assets
import { Button } from "../../components/Button";

//token
import { neutral, typeScale } from "../../components/token";

//redux
import { connect } from "react-redux";
// import { loginUser } from "../../reducers/authReducer";

const Login = (props) => {
  const errors = useState({});

  const handleChange = ({ currentTarget: input }) => {
    // const userInput = { ...data };
    // userInput[input.name] = input.value;
    // setData(userInput);
  };

  return (
    <Container>
      <h4>Login</h4>

      <form>
        <Input
          placeholder="Email"
          type="text"
          name="email"
          // value={data.email}
          error={errors.email}
          handleChange={handleChange}
        />
        <Input
          placeholder="Email"
          type="text"
          name="email"
          // value={data.email}
          error={errors.email}
          handleChange={handleChange}
        />
        <Button label="Login" color="#266150" />
      </form>

      <Redirect>
        <p>Don't have an accout?</p>
        <p className="link" onClick={() => props.goToSignup()}>
          Signup
        </p>
      </Redirect>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  min-width: 340px;
  padding: 1.5rem;
`;

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

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default Login;

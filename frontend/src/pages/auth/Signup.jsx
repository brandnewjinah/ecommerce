import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

//components
import { Input } from "../../components/Input2";
import { Button } from "../../components/Button";

//token
import { primaryColor, typeScale, neutral } from "../../components/token";

const Signup = (props) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validate = Yup.object({
    name: Yup.string(),
  });

  return (
    <Container>
      <h4>Create an account</h4>
      <Formik initialValues={user}>
        {(formik) => (
          <Form>
            {console.log(formik.values)}
            <Input name="name" placeholder="Name" />
            <Input name="email" placeholder="Email" type="email" />
            <Input name="password" placeholder="Password" type="password" />
            <Input
              name="confirmPassword"
              placeholder="Confirm Password"
              type="password"
            />
            <Button label="Signup" color={primaryColor.button} />
          </Form>
        )}
      </Formik>
      <Redirect>
        <p>Already have an account?</p>
        <p className="link" onClick={() => props.goToSignin()}>
          Login
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

export default Signup;

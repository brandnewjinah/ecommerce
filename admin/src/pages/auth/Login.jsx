import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";

import styled from "styled-components";

//comp
import Input from "../../components/Input";
import { Button } from "../../components/Button";

//token
import { primaryColor } from "../../components/token";

//redux
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../redux/authRedux";

const Auth = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const { isLoading, isSuccess, isError, message, currentUser } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      alert(message);
    }

    if (isSuccess) {
      history.push("/home");
    }
  }, [isSuccess, isError, message, currentUser, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signin(user));
  };

  return (
    <Container>
      <Header>
        <h3>Sign In</h3>
      </Header>

      <form onSubmit={handleSubmit}>
        <Input
          name="email"
          placeholder="Email"
          type="email"
          required
          handleChange={handleChange}
        />
        <Input
          name="password"
          placeholder="Password"
          type="password"
          required
          handleChange={handleChange}
        />
        <Button
          label="Sign In"
          color={primaryColor.button}
          type="submit"
          margin="1rem 0"
        />
      </form>
    </Container>
  );
};

const Container = styled.div`
  width: 400px;
  padding: 2rem 1.5rem;
  margin: 0 auto;
`;

const Header = styled.header`
  h3 {
    text-transform: uppercase;
    text-align: center;
    letter-spacing: 0.05rem;
    padding: 1rem 0;
  }
`;

export default Auth;

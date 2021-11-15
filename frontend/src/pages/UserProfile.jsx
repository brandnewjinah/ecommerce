import React, { useState } from "react";
import styled from "styled-components";

//components
import Layout from "../components/layout/sub/Layout";
import { HeaderContainer } from "../components/layout/Containers";
import { Input } from "../components/Input2";
import { Button } from "../components/Button";

//token
import { neutral, typeScale, primaryColor } from "../components/token";

//redux
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../redux/authRedux";

const UserProfile = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { currentUser } = auth;

  const [account, setAccount] = useState({
    name: currentUser.name,
    email: currentUser.email,
    password: "",
  });

  const handleChange = ({ currentTarget: input }) => {
    const newAccount = { ...account };
    newAccount[input.name] = input.value;
    setAccount(newAccount);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editUser(account));
  };

  return (
    <Layout path="account">
      <HeaderContainer
        title="User Profile"
        body="Edit your account information"
      />
      <Content>
        <Section onSubmit={handleSubmit}>
          <div>
            <Input
              label="Name"
              name="name"
              value={account.name}
              handleChange={handleChange}
            />
          </div>
          <div>
            <Input
              label="Email"
              name="email"
              value={account.email}
              handleChange={handleChange}
            />
          </div>
          <div>
            <Input
              label="New Password"
              name="password"
              value={account.password}
              type="password"
              handleChange={handleChange}
            />
          </div>
          <Button
            label="Save"
            color={primaryColor.button}
            type="submit"
            margin="1rem 0"
          />
        </Section>
      </Content>
    </Layout>
  );
};

const Content = styled.div``;

const Section = styled.form`
  width: 100%;
  font-size: ${typeScale.sbody};
  border-bottom: 1px solid ${neutral[100]};
  padding: 1rem 0;

  div {
    padding: 0.125rem 0;
  }
`;

export default UserProfile;

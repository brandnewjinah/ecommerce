import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

//comp
import Layout from "../../layout/sub/Layout";
import { HeaderSmall } from "../../components/Header";
import { Section } from "../../components/containers/Section";
import { TextInput } from "../../components/TextInput";
import { primaryColor } from "../../components/token";
import { Div } from "../../components/containers/Div";
import { Button } from "../../components/Button";

//interface
import { AuthErrors, AuthIF } from "../../interfaces/authInterface";

//redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { editUser } from "../../redux/authRedux";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.auth);

  const [user, setUser] = useState({
    name: currentUser.name,
    email: currentUser.email,
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<AuthErrors>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const userInput = { ...user };
    userInput[name as keyof AuthIF] = value;
    setUser(userInput);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(editUser(user));
  };

  //after data submitted
  useEffect(() => {}, []);

  return (
    <Layout>
      <Div width="85%">
        <HeaderSmall title="Account Information" margin="0 0 2rem 0" />
        <form onSubmit={handleSubmit}>
          <Section gap="1rem">
            <TextInput
              name="Name"
              label="Name"
              placeholder="Name"
              value={user.name}
              error={errors.name}
              onChange={handleInputChange}
            />
            <TextInput
              name="email"
              label="Email"
              placeholder="Email"
              type="email"
              value={user.email}
              error={errors.email}
              onChange={handleInputChange}
            />
            <TextInput
              name="password"
              label="Password"
              placeholder="Password"
              type="password"
              error={errors.password}
              onChange={handleInputChange}
            />
            <TextInput
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm Password"
              type="password"
              error={errors.confirmPassword}
              onChange={handleInputChange}
            />
            <Button
              label="Save Changes"
              color={primaryColor.button}
              type="submit"
            />
          </Section>
        </form>
      </Div>
    </Layout>
  );
};

export default UserProfile;

import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config.json";

//import components
import Input from "../../components/Input";
import { Button, BtnText } from "../../components/Button";

//import styles and assets
import styled from "styled-components";

const UserDetail = (props) => {
  const [data, setData] = useState({
    name: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = ({ currentTarget: input }) => {
    const userInput = { ...data };
    userInput[input.name] = input.value;
    setData(userInput);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios
      .get(`${config.API}/user/${props.match.params.id}`)
      .then((res) => {
        const { userInfo } = res.data;
        setData(userInfo);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const validate = () => {
    const errors = {};
    if (data.name === "") {
      errors.name = "Name is required";
    }
    if (data.email === "") {
      errors.email = "Email is required";
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    console.log(errors);
    setErrors(errors || {});
    if (errors) return;
    updateData();
  };

  const updateData = async () => {
    const user = {
      name: data.name,
      email: data.email,
    };
    await axios
      .put(`${config.API}/user/${props.match.params.id}`, user)
      .then((res) => {
        if (res.status === 200) {
          alert("User updated");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleDelete = async () => {
    await axios
      .delete(`${config.API}/product/${props.match.params.id}`)
      .then((res) => {
        if (res.status === 200) {
          alert("Product deleted");
          props.history.push("/products");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <Wrapper>
      <h4>User Detail</h4>
      <form onSubmit={handleSubmit}>
        <Input
          label="Name"
          name="name"
          value={data.name}
          error={errors.name}
          handleChange={handleChange}
        />
        <Input
          label="Email"
          name="email"
          value={data.email}
          error={errors.email}
          handleChange={handleChange}
        />
        <Button label="Update" />
      </form>
      <div style={{ margin: `1em 0` }}>
        <BtnText label="Delete User" handleClick={handleDelete} />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default UserDetail;

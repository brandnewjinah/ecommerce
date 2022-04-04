import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import config from "../../config.json";

//import components
import Input from "../../components/Input";
import { Button, TextButton } from "../../components/Button";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getOneUser } from "../../redux/userRedux";
import Heading from "../../components/Heading";
import { Card } from "../../components/Card";

const UserDetail = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [data, setData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    dispatch(getOneUser(id));
  }, [dispatch, id]);

  const users = useSelector((state) => state.users);
  const { userDetailLoading, userDetail } = users;

  useEffect(() => {
    if (userDetail)
      setData({
        name: userDetail.name,
        email: userDetail.email,
      });
  }, [userDetail]);

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
      <Heading title="User Detail" />
      <Card margin="1rem 0">
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
          <Button label="Update" color="#1C9CFD" />
        </form>
      </Card>
      <div style={{ margin: `1em 0` }}>
        <TextButton label="Delete User" handleClick={handleDelete} />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default UserDetail;

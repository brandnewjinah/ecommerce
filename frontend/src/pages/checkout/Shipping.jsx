import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import styled from "styled-components";

//components
import { Input } from "../../components/Input";
import { Button, TextButton } from "../../components/Button";
import Text from "../../components/Text";
import { fontSize, lineHeight, primaryColor } from "../../components/token";

//redux
import { useDispatch } from "react-redux";
import { saveShipping } from "../../redux/orderRedux";

const Shipping = ({ handleStep, step, info }) => {
  const validate = Yup.object({
    fullName: Yup.string().required("Name is required"),
    address1: Yup.string().required("Street address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zip: Yup.string().required("Zip Code is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: info && info.fullName ? info.fullName : "",
      address1: info && info.address1 ? info.address1 : "",
      address2: info && info.address2 ? info.address2 : "",
      city: info && info.city ? info.city : "",
      state: info && info.state ? info.state : "",
      zip: info && info.zip ? info.zip : "",
      phone: info && info.phone ? info.phone : "",
    },
    resolver: yupResolver(validate),
  });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(saveShipping(data));
    handleStep(2);
  };

  return (
    <Section>
      <h2>1. Shipping</h2>
      {step === 1 && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Item>
            <Input
              placeholder="Full Name"
              name="fullName"
              register={register}
              errors={errors}
            />
          </Item>
          <Item>
            <Input
              placeholder="Street Address"
              name="address1"
              register={register}
              errors={errors}
            />
          </Item>
          <Item>
            <Input
              placeholder="Building, Suite or Apartment Number"
              name="address2"
              register={register}
              errors={errors}
            />
          </Item>
          <Item>
            <Input
              placeholder="City"
              name="city"
              register={register}
              errors={errors}
            />
          </Item>
          <Item>
            <Input
              placeholder="State"
              name="state"
              register={register}
              errors={errors}
            />
            <Input
              placeholder="Zip Code"
              name="zip"
              register={register}
              errors={errors}
            />
          </Item>
          <Item>
            <Input
              placeholder="Phone Number"
              name="phone"
              register={register}
              errors={errors}
            />
          </Item>
          <Button label="Next" color={primaryColor.button} />
        </form>
      )}
      {step !== 1 && (
        <Article>
          <Text bold>{info.fullName}</Text>
          <Text>{info.address1}</Text>
          <Text>{`${info.city}, ${info.state} ${info.zip}`}</Text>
          <TextButton label="edit" handleClick={() => handleStep(1)} />
        </Article>
      )}
    </Section>
  );
};

const Section = styled.section`
  background-color: #fff;
  box-shadow: 0 0 30px 0 rgba(63, 76, 105, 0.05);
  border-radius: 0.25em;
  padding: 2em;
  margin-bottom: 1em;

  h2 {
    font-size: ${fontSize.lg2};
    padding: 0.875rem 0;
  }

  p {
    font-size: ${fontSize.sm1};
  }

  .item {
    margin-bottom: 1em;
  }

  .edit {
    text-decoration: underline;
    padding: 0.5rem 0;
    cursor: pointer;
  }
`;

const Item = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  div {
    flex: 1;
  }
`;

const Article = styled.article`
  line-height: ${lineHeight.base};
`;

export default Shipping;

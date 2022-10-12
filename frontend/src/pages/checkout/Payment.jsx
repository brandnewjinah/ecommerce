import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import styled from "styled-components";

//components
import { Input } from "../../components/Input";
import { Button, TextButton } from "../../components/Button";
import { fontSize, primaryColor } from "../../components/token";

//redux
import { useDispatch } from "react-redux";
import { savePayment } from "../../redux/orderRedux";
import Text from "../../components/Text";

const Payment = ({ handleStep, step, info }) => {
  const validate = Yup.object({
    billingFirstName: Yup.string().required("First name is required"),
    billingLastName: Yup.string().required("Last name is required"),
    cardNumber: Yup.number().required("Card Number is required"),
    expiration: Yup.string().required("Expiration Date is required"),
    security: Yup.number().required("Security Code is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validate),
  });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(savePayment(data));
    handleStep(4);
  };

  return (
    <Section>
      <h2>3. Payment Method</h2>
      {step === 3 && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Item>
            <Input
              placeholder="First Name"
              name="billingFirstName"
              register={register}
              errors={errors}
            />
            <Input
              placeholder="Last Name"
              name="billingLastName"
              register={register}
              errors={errors}
            />
          </Item>
          <Input
            name="cardNumber"
            pattern="\d*"
            maxLength={16}
            placeholder="0000 0000 0000 1234"
            register={register}
            errors={errors}
          />
          <Item>
            <Input
              placeholder="MM/YY"
              name="expiration"
              register={register}
              errors={errors}
            />
            <Input
              placeholder="CVC"
              name="security"
              register={register}
              errors={errors}
            />
          </Item>
          <Button label="Review Order" color={primaryColor.button} />
        </form>
      )}
      {step !== 3 && (
        <>
          {info && Object.keys(info).length !== 0 && (
            <>
              <Text bold>
                {`${info.billingFirstName} ${info.billingLastName}`}
              </Text>
              <Text>Card ending in {String(info.cardNumber).slice(-4)}</Text>
              <Text>{info.expiration}</Text>
              <TextButton label="edit" handleClick={() => handleStep(3)} />
            </>
          )}
        </>
      )}
    </Section>
  );
};

const Section = styled.div`
  background-color: #fff;
  box-shadow: 0 0 30px 0 rgba(63, 76, 105, 0.05);
  border-radius: 0.25em;
  padding: 2em;
  margin-bottom: 1em;

  h2 {
    font-size: ${fontSize.lg2};
    padding: 0.875rem 0;
  }

  .item {
    margin-bottom: 1em;
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

export default Payment;

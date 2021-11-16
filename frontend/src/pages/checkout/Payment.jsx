import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import styled from "styled-components";

//components
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { primaryColor } from "../../components/token";

//redux
import { useDispatch } from "react-redux";
import { savePayment } from "../../redux/orderRedux";

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
    handleStep(4);
    dispatch(savePayment(data));
  };

  return (
    <Section>
      <h5>3. Payment Method</h5>
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
            placeholder="Card Number"
            name="cardNumber"
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
          {info && (
            <>
              <p>
                <span>{info.billingFirstName}</span>
                <span>{info.billingLastName}</span>
              </p>
              <p>{info.cardNumber}</p>
              <p onClick={() => handleStep(3)}>edit</p>
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

  h5 {
    text-transform: uppercase;
    letter-spacing: 0.075rem;
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

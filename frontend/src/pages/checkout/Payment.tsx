import React, { FC, useState, ChangeEvent } from "react";
import { Div, Flex } from "../../components/containers/Div";

//compt
import { Section } from "../../components/containers/Section";
import { Body, Header } from "../../components/Text";
import { InputMask, TextInput } from "../../components/TextInput";
import { neutral, primaryColor } from "../../components/token";
import { Button, TextButton } from "../../components/Button";

//IF
import { PaymentIF } from "../../interfaces/checkoutInterface";

//util
import { paymentValidate } from "../../utils/validate";

//redux
import { useDispatch } from "react-redux";
import { savePayment } from "../../redux/checkoutRedux";

interface Props {
  step?: number;
  info?: PaymentIF;
  handleStep?: (num: number) => void;
}

const Payment: FC<Props> = ({ step, info, handleStep }) => {
  const dispatch = useDispatch();
  const [payment, setPayment] = useState<PaymentIF>({
    fullName: "",
    cardNumber: "",
    expiration: "",
    cvc: "",
  });

  //set payment
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const userInput = { ...payment };
    userInput[name as keyof PaymentIF] = value;
    setPayment(userInput);
  };

  const numberChanged = (val: string, name: string) => {
    setPayment({ ...payment, [name]: val });
  };

  const [errors, setErrors] = useState<PaymentIF>({});

  const handleNext = () => {
    const errors = paymentValidate(payment);
    setErrors(errors || {});
    if (errors) return;

    //dispatch and save
    dispatch(savePayment(payment));
    handleStep?.(4);
  };

  return (
    <Section bgColor="#fff" gap="1rem" padding="2rem">
      <Header variant="h2">
        <span className="step">3</span>
        <span>Payment</span>
      </Header>
      {step === 3 ? (
        <>
          <TextInput
            removeBorder
            name="fullName"
            placeholder="Full Name"
            value={payment.fullName!}
            error={errors.fullName}
            onChange={handleInputChange}
          />
          <InputMask
            removeBorder
            mask="#### #### #### ####"
            placeholder="Card Number"
            name="cardNumber"
            value={payment.cardNumber!}
            onChange={numberChanged}
          />
          <Flex gap="1rem">
            <div className="flexOne">
              <InputMask
                removeBorder
                mask="##/##"
                placeholder="MM/YY"
                name="expiration"
                value={payment.expiration!}
                onChange={numberChanged}
              />
            </div>
            <div className="flexOne">
              <TextInput
                removeBorder
                name="cvc"
                placeholder="CVC"
                value={payment.cvc!}
                error={errors.cvc}
                onChange={handleInputChange}
              />
            </div>
          </Flex>
          <Button
            label="Review Order"
            color={primaryColor.button}
            // handleClick={() => handleStep?.(2)}
            handleClick={handleNext}
          />
        </>
      ) : (
        info &&
        Object.keys(info).length !== 0 && (
          <Div margin="0 0 0 2.175rem">
            <Body variant="body_small" color={neutral[400]}>
              {`**** ${info?.cardNumber?.slice(-4)}`}
            </Body>
            <TextButton
              label="edit"
              padding="0.5rem 0 0 0"
              handleClick={() => handleStep?.(3)}
            />
          </Div>
        )
      )}
    </Section>
  );
};

export default Payment;

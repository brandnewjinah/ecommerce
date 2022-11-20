import React, { FC, useState, ChangeEvent, MouseEvent } from "react";
import styled from "styled-components";
import { Button } from "../../components/Button";
import { Flex } from "../../components/containers/Div";
import { Section } from "../../components/containers/Section";
import { Header } from "../../components/Text";
import { TextInput } from "../../components/TextInput";
import { primaryColor } from "../../components/token";
import { ShippingIF } from "../../interfaces/checkoutInterface";
import { shippingValidate } from "../../utils/validate";

interface Props {
  step?: number;
  handleStep?: (num: number) => void;
}

const Shipping: FC<Props> = ({ step, handleStep }) => {
  const [shipping, setShipping] = useState<ShippingIF>({
    fullName: "",
    streetAddress: "",
    streetAddress2: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });

  const [errors, setErrors] = useState<ShippingIF>({});

  //set shipping
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const userInput = { ...shipping };
    userInput[name as keyof ShippingIF] = value;
    setShipping(userInput);
  };

  const handleNext = () => {
    const errors = shippingValidate(shipping);

    setErrors(errors || {});
    if (errors) return;

    //dispatch and save
    handleStep?.(2);
  };

  return (
    <Section bgColor="#fff" gap="1rem" padding="2rem">
      <Header variant="h2">
        <span className="step">1</span>
        <span>Shipping</span>
      </Header>
      {step === 1 ? (
        <>
          <TextInput
            removeBorder
            name="fullName"
            placeholder="Full Name"
            error={errors.fullName}
            onChange={handleInputChange}
          />
          <TextInput
            removeBorder
            name="streetAddress"
            placeholder="Street Address"
            error={errors.streetAddress}
            onChange={handleInputChange}
          />
          <TextInput
            removeBorder
            name="streetAddress2"
            placeholder="Apartment, Suite, Building (Optional)"
            onChange={handleInputChange}
          />
          <TextInput
            removeBorder
            name="city"
            placeholder="City"
            error={errors.city}
            onChange={handleInputChange}
          />
          <Flex gap="1rem">
            <TextInput
              removeBorder
              name="state"
              placeholder="State"
              error={errors.state}
              onChange={handleInputChange}
            />
            <TextInput
              removeBorder
              name="zip"
              placeholder="Zip Code"
              error={errors.zip}
              onChange={handleInputChange}
            />
          </Flex>
          <TextInput
            removeBorder
            name="phone"
            placeholder="Phone Number"
            error={errors.phone}
            onChange={handleInputChange}
          />
          <Button
            label="Next"
            color={primaryColor.button}
            // handleClick={() => handleStep?.(2)}
            handleClick={handleNext}
          />
        </>
      ) : (
        <>
          <div>test</div>
        </>
      )}
    </Section>
  );
};

export default Shipping;

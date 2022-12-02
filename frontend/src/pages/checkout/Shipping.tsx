import React, { FC, useState, ChangeEvent } from "react";

//comp
import { Button, TextButton } from "../../components/Button";
import { Div, Flex } from "../../components/containers/Div";
import { Section } from "../../components/containers/Section";
import Select from "../../components/Select";
import { Body, Header } from "../../components/Text";
import { InputMask, TextInput } from "../../components/TextInput";
import { primaryColor, neutral } from "../../components/token";

//IF
import { ShippingIF } from "../../interfaces/checkoutInterface";

//util
import { shippingValidate } from "../../utils/validate";

//data
import { statesList } from "../../data/states";

//redux
import { useDispatch } from "react-redux";
import { saveShipping } from "../../redux/checkoutRedux";

interface Props {
  step?: number;
  info?: ShippingIF;
  handleStep?: (num: number) => void;
}

const Shipping: FC<Props> = ({ step, info, handleStep }) => {
  const dispatch = useDispatch();
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
  const [isEdit, setIsEdit] = useState(false);

  //set shipping
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const userInput = { ...shipping };
    userInput[name as keyof ShippingIF] = value;
    setShipping(userInput);
  };

  const handleStateSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    let currentShipping = { ...shipping };
    currentShipping.state = value;
    setShipping(currentShipping);
  };

  const numberChanged = (val: string, name: string) => {
    setShipping({ ...shipping, [name]: val });
  };

  const handleNext = () => {
    const errors = shippingValidate(shipping);

    setErrors(errors || {});
    if (errors) return;

    //dispatch and save
    dispatch(saveShipping(shipping));
    isEdit ? handleStep?.(4) : handleStep?.(2);
  };

  const handleEdit = () => {
    setIsEdit(true);
    handleStep?.(1);
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
            value={shipping.fullName!}
            error={errors.fullName}
            onChange={handleInputChange}
          />
          <TextInput
            removeBorder
            name="streetAddress"
            placeholder="Street Address"
            value={shipping.streetAddress!}
            error={errors.streetAddress}
            onChange={handleInputChange}
          />
          <TextInput
            removeBorder
            name="streetAddress2"
            placeholder="Apartment, Suite, Building (Optional)"
            value={shipping.streetAddress2!}
            onChange={handleInputChange}
          />
          <TextInput
            removeBorder
            name="city"
            placeholder="City"
            value={shipping.city!}
            error={errors.city}
            onChange={handleInputChange}
          />
          <Flex gap="1rem">
            <div className="flexOne">
              <Select
                fullWidth
                options={statesList}
                error={errors.state}
                onChange={handleStateSelect}
              />
            </div>
            <div className="flexOne">
              <TextInput
                removeBorder
                name="zip"
                placeholder="Zip Code"
                value={shipping.zip!}
                error={errors.zip}
                onChange={handleInputChange}
              />
            </div>
          </Flex>
          <InputMask
            removeBorder
            mask="(###) ###-####"
            placeholder="Phone Number"
            name="phone"
            value={shipping.phone!}
            error={errors.phone}
            onChange={numberChanged}
          />
          <Button
            label={isEdit ? "Save Shipping" : "See Delivery Options"}
            color={primaryColor.button}
            handleClick={handleNext}
          />
        </>
      ) : (
        info &&
        Object.keys(info).length !== 0 && (
          <>
            <Div margin="0 0 0 2.175rem">
              <Body variant="body_small" color={neutral[400]}>
                {info?.fullName}
              </Body>
              <Body variant="body_small" color={neutral[400]}>
                {info?.streetAddress}
              </Body>
              <Body
                variant="body_small"
                color={neutral[400]}
              >{`${info?.city} ${info?.state} ${info?.zip}`}</Body>
              <TextButton
                label="edit"
                padding="0.5rem 0 0 0"
                // handleClick={() => handleStep?.(1)}
                handleClick={handleEdit}
              />
            </Div>
          </>
        )
      )}
    </Section>
  );
};

export default Shipping;

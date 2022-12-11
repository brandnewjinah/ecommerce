import React, { FC, useState } from "react";

//compt
import { Section } from "../../components/containers/Section";
import { Div } from "../../components/containers/Div";
import { Body, Header } from "../../components/Text";
import Radio from "../../components/Radio";
import { Button, TextButton } from "../../components/Button";

import { neutral, primaryColor } from "../../components/token";

//IF
import { DeliveryIF } from "../../interfaces/checkoutInterface";

//redux
import { useDispatch } from "react-redux";
import { saveDelivery } from "../../redux/checkoutRedux";

interface Props {
  step?: number;
  info?: DeliveryIF;
  handleStep?: (num: number) => void;
}

const Delivery: FC<Props> = ({ step, info, handleStep }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    shipping: "Standard",
  });
  const [isEdit, setIsEdit] = useState(false);

  const handleNext = () => {
    dispatch(saveDelivery(data));
    isEdit ? handleStep?.(4) : handleStep?.(3);
  };

  const handleEdit = () => {
    setIsEdit(true);
    handleStep?.(2);
  };

  return (
    <Section bgColor="#fff" gap="1rem" padding="2rem">
      <Header variant="h2">
        <span className="step">2</span>
        <span>Delivery</span>
      </Header>
      {step === 2 ? (
        <div>
          <Radio
            name="shipping"
            data={[
              {
                type: "Standard",
                desc: "4-8 business days - Free",
              },
              {
                type: "Express",
                desc: "1-3 business days - $15.00",
              },
            ]}
            defaultValue={data.shipping}
            handleSelected={(value: any) =>
              setData({ ...data, shipping: value })
            }
          />
          <Button
            label={isEdit ? "Save Delivery" : "Continue To Payment"}
            color={primaryColor.button}
            handleClick={handleNext}
          />
        </div>
      ) : (
        info &&
        Object.keys(info).length !== 0 && (
          <Div margin="0 0 0 2.175rem">
            <Body variant="body_small" color={neutral[400]}>
              {info?.shipping}
            </Body>
            <TextButton
              label="edit"
              padding="0.5rem 0 0 0"
              handleClick={handleEdit}
            />
          </Div>
        )
      )}
    </Section>
  );
};

export default Delivery;

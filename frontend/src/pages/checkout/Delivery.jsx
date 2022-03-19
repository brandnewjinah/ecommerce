import React, { useState } from "react";
import styled from "styled-components";

//components
import Selector from "../../components/Selector";
import { Button, TextButton } from "../../components/Button";
import { fontScale, primaryColor } from "../../components/token";

//redux
import { useDispatch } from "react-redux";
import { saveDelivery } from "../../redux/orderRedux";
import Text from "../../components/Text";

const Delivery = ({ handleStep, step, info }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    shipping: "standard",
  });

  const handleClick = () => {
    dispatch(saveDelivery(data));
    handleStep(3);
  };
  return (
    <Section>
      <h2>2. Delivery</h2>

      {step === 2 && (
        <>
          <Selector
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
            handleSelected={(value) => setData({ ...data, shipping: value })}
          />
          <Button
            label="Next"
            color={primaryColor.button}
            handleClick={handleClick}
          />
        </>
      )}
      {step !== 2 && (
        <>
          {info && info.shipping && (
            <>
              <Text>{info.shipping}</Text>
              <TextButton label="edit" handleClick={() => handleStep(2)} />
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
    font-size: ${fontScale.scale_b4};
    padding: 0.875rem 0;
  }

  .item {
    margin-bottom: 1em;
  }

  p {
    font-size: ${fontScale.scale_s2};
  }

  .edit {
    text-decoration: underline;
    padding: 0.5rem 0;
    cursor: pointer;
  }
`;

export default Delivery;

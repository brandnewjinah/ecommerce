import React, { ChangeEvent, useEffect, useState } from "react";

//comp
import { Flex } from "../../../components/containers/Div";
import { TextInput } from "../../../components/TextInput";
import { primaryColor } from "../../../components/token";
import { Button } from "../../../components/Button";

//others
import { BrandIF } from "../../../interfaces/settingsInterface";
import { brandValidate } from "../../../utils/validate";

//redux
import { useDispatch, useSelector } from "react-redux";
import { addBrand, reset } from "../../../redux/settingsActionsReducer";
import { RootState } from "../../../redux/store";
import { TextArea } from "../../../components/TextArea";

const AddNewBrand = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<BrandIF>({});

  const [brand, setBrand] = useState<BrandIF>({
    name: "",
    value: "",
    description: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const userInput = { ...brand };
    userInput[name as keyof BrandIF] = value;
    setBrand(userInput);
  };

  const handleSubmit = () => {
    const errors = brandValidate(brand);
    setErrors(errors || {});
    if (errors) return;

    dispatch(addBrand(brand));
  };

  //actions after submitting data
  const { brandAdded } = useSelector(
    (state: RootState) => state.settingsActions
  );

  const clear = () => {
    setBrand({
      name: "",
      value: "",
      description: "",
    });
  };

  useEffect(() => {
    if (brandAdded.status === 201) {
      alert("Brand successfully created!");
      dispatch(reset());
      clear();
      window.location.reload();
    } else if (brandAdded.status !== 201 && brandAdded.status !== 0) {
      alert("error");
    }
  }, [dispatch, brandAdded.status, brandAdded.brandDetails._id]);

  return (
    <>
      <Flex gap="1rem">
        <TextInput
          label="Name"
          name="name"
          error={errors.name}
          onChange={handleInputChange}
        />
        <TextInput
          label="Value"
          name="value"
          error={errors.value}
          placeholder="Write in camel case. (e.g. coffeeAndTea)"
          onChange={handleInputChange}
        />
      </Flex>
      <TextArea
        label="Description"
        name="description"
        onChange={handleInputChange}
      />
      <Button
        label="Add"
        color={primaryColor.button}
        handleClick={handleSubmit}
        margin=".45rem 0 0 0"
      />
    </>
  );
};

export default AddNewBrand;

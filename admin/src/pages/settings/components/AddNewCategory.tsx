import React, { ChangeEvent, useEffect, useState } from "react";

//comp
import { Flex } from "../../../components/containers/Div";
import { TextInput } from "../../../components/TextInput";
import { primaryColor } from "../../../components/token";
import { Button } from "../../../components/Button";

//others
import { CategoryIF } from "../../../interfaces/settingsInterface";
import { categoryValidate } from "../../../utils/validate";

//redux
import { useDispatch, useSelector } from "react-redux";
import { addCategory, reset } from "../../../redux/settingsActionsReducer";
import { RootState } from "../../../redux/store";

const AddNewCategory = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<CategoryIF>({});

  const [category, setCategory] = useState<CategoryIF>({
    name: "",
    value: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const userInput = { ...category };
    userInput[name as keyof CategoryIF] = value;
    setCategory(userInput);
  };

  const handleSubmit = () => {
    const errors = categoryValidate(category);
    setErrors(errors || {});
    if (errors) return;

    dispatch(addCategory(category));
  };

  //actions after submitting data
  const { categoryAdded } = useSelector(
    (state: RootState) => state.settingsActions
  );

  const clear = () => {
    setCategory({
      name: "",
      value: "",
    });
  };

  useEffect(() => {
    if (categoryAdded.status === 201) {
      alert("Category successfully created!");
      dispatch(reset());
      clear();
    } else if (categoryAdded.status !== 201 && categoryAdded.status !== 0) {
      alert("error");
    }
  }, [dispatch, categoryAdded.status, categoryAdded.categoryDetails._id]);

  return (
    <>
      <Flex gap="1rem">
        <TextInput
          label="Name"
          name="name"
          error={errors.name}
          helper="e.g. Coffee and Tea"
          onChange={handleInputChange}
        />
        <TextInput
          label="Value"
          name="value"
          error={errors.value}
          helper="Write in camel case. (e.g. coffeeAndTea)"
          onChange={handleInputChange}
        />
        <Button
          label="Add"
          color={primaryColor.button}
          handleClick={handleSubmit}
          margin=".45rem 0 0 0"
        />
      </Flex>
    </>
  );
};

export default AddNewCategory;

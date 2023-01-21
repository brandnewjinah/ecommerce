import React, { ChangeEvent, useEffect, useState } from "react";

//comp
import { Div } from "../../components/containers/Div";
import { Header } from "../../components/Header";
import Breadcrumbs from "../../components/Breadcrumbs";
import { Section } from "../../components/containers/Section";
import { TextInput } from "../../components/TextInput";
import { Button } from "../../components/Button";
import FlexTable from "../../components/FlexTable";
import { primaryColor } from "../../components/token";

//others
import { CategoryIF } from "../../interfaces/settingsInterface";
import { categoryValidate } from "../../utils/validate";

//redux
import { useDispatch, useSelector } from "react-redux";
import { addCategory, reset } from "../../redux/settingsActionsReducer";
import { RootState } from "../../redux/store";
import CategoryList from "./CategoryList";

const AddCategories = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState<CategoryIF>({
    name: "",
    value: "",
  });

  const [errors, setErrors] = useState<CategoryIF>({});

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
    <Div>
      <Header title="Categories" textAlign="left" />
      <Breadcrumbs category1={{ title: "Settings" }} category2="Categories" />
      <Section bgColor="#fff" padding="1.25rem" margin="1rem 0">
        <CategoryList />
      </Section>
      <Section bgColor="#fff" gap=".875rem" padding="1.25rem" margin="1rem 0">
        <TextInput
          label="Name"
          name="name"
          error={errors.name}
          helper="Write name as how customers would see it. (e.g. Coffee and Tea)"
          onChange={handleInputChange}
        />
        <TextInput
          label="Value"
          name="value"
          error={errors.value}
          helper="Write value in camel case. (e.g. coffeeAndTea)"
          onChange={handleInputChange}
        />
      </Section>
      <Button
        label="Add"
        color={primaryColor.button}
        handleClick={handleSubmit}
      />
    </Div>
  );
};

export default AddCategories;

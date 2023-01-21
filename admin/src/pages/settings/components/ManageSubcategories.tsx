import React, { ChangeEvent, useEffect, useState } from "react";

//comp
import { Section } from "../../../components/containers/Section";
import { Header } from "../../../components/Header";
import { Flex } from "../../../components/containers/Div";
import List from "../../../components/List";
import { Body } from "../../../components/Text";
import { TextInput } from "../../../components/TextInput";
import { neutral, primaryColor } from "../../../components/token";
import { Check, Delete, Edit, Minus } from "../../../assets/Icon";
import { Button, IconButton } from "../../../components/Button";

//others
import {
  CategoryIF,
  SubcategoryIF,
} from "../../../interfaces/settingsInterface";

//redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  updateCategory,
  reset,
  deleteSubCategory,
  addSubCategory,
} from "../../../redux/settingsActionsReducer";

const ManageSubcategories = () => {
  const dispatch = useDispatch();
  const [subCategories, setSubCategories] = useState<SubcategoryIF[]>();

  const { data } = useSelector(
    (state: RootState) => state.settings.categoryDetails
  );

  //load subcategories
  useEffect(() => {
    setSubCategories(data.subCategory);
  }, [data]);

  //edit mode
  const [currentEditMode, setCurrentEditMode] = useState(10000);

  const handleCurrentEditMode = (idx: number) => {
    setCurrentEditMode(idx);
  };

  const handleSubInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const { name, value } = e.target;

    //find current item
    let newSubCategories = [...subCategories!];
    let itemIndex = newSubCategories.findIndex((item) => item._id === id);
    let thisItem = newSubCategories[itemIndex];

    let newItem = { ...thisItem };
    newItem[name as keyof CategoryIF] = value;

    newSubCategories[itemIndex] = newItem;
    setSubCategories(newSubCategories);
  };

  const handleDeleteSub = (id: string) => {
    dispatch(deleteSubCategory({ catId: data._id, subId: id }));
  };

  //submit edit
  const handleSubSubmit = (id: string) => {
    setCurrentEditMode(10000);
    dispatch(
      updateCategory({
        id: data._id,
        category: {
          name: data.name,
          value: data.value,
          subCategory: subCategories,
        },
      })
    );
  };

  //add new
  const [newSubcategory, setNewSubcategory] = useState<CategoryIF>({
    name: "",
    value: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const userInput = { ...newSubcategory };
    userInput[name as keyof CategoryIF] = value;
    setNewSubcategory(userInput);
  };

  const handleNewSubSubmit = () => {
    dispatch(addSubCategory({ id: data._id!, sub: newSubcategory }));
  };

  //actions after submitting data
  const { categoryUpdated, subDeleted, subAdded } = useSelector(
    (state: RootState) => state.settingsActions
  );

  useEffect(() => {
    if (categoryUpdated.status === 200) {
      alert("Category successfully updated!");
      dispatch(reset());
    } else if (subDeleted.status === 200) {
      alert("Subcategory successfully deleted");
      dispatch(reset());
      window.location.reload();
    } else if (subAdded.status === 200) {
      alert("Subcategory successfully added");
      dispatch(reset());
      window.location.reload();
    } else if (
      (categoryUpdated.status !== 200 && categoryUpdated.status !== 0) ||
      (subDeleted.status !== 200 && subDeleted.status !== 0) ||
      (subAdded.status !== 200 && subAdded.status !== 0)
    ) {
      alert("error");
    }
  }, [
    dispatch,
    categoryUpdated.status,
    categoryUpdated.categoryDetails._id,
    subDeleted.status,
    subDeleted.categoryDetails._id,
    subAdded.status,
    subAdded.categoryDetails._id,
  ]);

  return (
    <>
      <Section bgColor="#fff" padding="1.25rem" margin="1rem 0">
        <Header title="Manage Subcategories" small margin="0 0 1.75rem 0" />
        {subCategories &&
          subCategories?.map((item, idx) =>
            currentEditMode === idx ? (
              <List key={idx}>
                <TextInput
                  className="flexTwo"
                  placeholder="Name"
                  name="name"
                  value={item.name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleSubInputChange(e, item._id!)
                  }
                />
                <TextInput
                  className="flexTwo"
                  placeholder="Value"
                  name="value"
                  value={item.value}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleSubInputChange(e, item._id!)
                  }
                />
                <Flex className="flexOne" gap="1rem">
                  <IconButton
                    handleClick={() => handleSubSubmit(item._id!)}
                    bgColor={primaryColor.blue}
                  >
                    <Check width={18} height={18} color="#fff" stroke={2} />
                  </IconButton>
                  <IconButton handleClick={() => setCurrentEditMode(10000)}>
                    <Minus
                      width={18}
                      height={18}
                      color={neutral[600]}
                      stroke={2}
                    />
                  </IconButton>
                </Flex>
              </List>
            ) : (
              <List key={idx}>
                <Body variant="body_small" className="flexTwo">
                  {item.name}
                </Body>
                <Body
                  variant="body_small"
                  className="flexTwo"
                  color={neutral[400]}
                >
                  {item.value}
                </Body>
                <Flex className="flexOne" gap="1rem">
                  <IconButton handleClick={() => handleCurrentEditMode(idx)}>
                    <Edit
                      width={18}
                      height={18}
                      color={neutral[600]}
                      stroke={2}
                    />
                  </IconButton>
                  <IconButton handleClick={() => handleDeleteSub(item._id!)}>
                    <Delete
                      width={18}
                      height={18}
                      color={neutral[600]}
                      stroke={2}
                    />
                  </IconButton>
                </Flex>
              </List>
            )
          )}
      </Section>
      <Section bgColor="#fff" padding="1.25rem" margin="1rem 0">
        <Header title="Add Subcategories" small margin="0 0 1.75rem 0" />
        <Flex gap=".5rem" alignItems="center" padding="1.5rem 0">
          <TextInput
            className="flexTwo"
            placeholder="Name"
            name="name"
            value={newSubcategory.name}
            onChange={handleInputChange}
          />
          <TextInput
            className="flexTwo"
            placeholder="Value"
            name="value"
            value={newSubcategory.value}
            onChange={handleInputChange}
          />
          <Button
            className="flexOne"
            label="Add"
            color={primaryColor.button}
            handleClick={handleNewSubSubmit}
          />
        </Flex>
      </Section>
    </>
  );
};

export default ManageSubcategories;

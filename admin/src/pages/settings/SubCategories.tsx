import React, { FC, ChangeEvent, useState, useEffect } from "react";

//comp
import { Flex } from "../../components/containers/Div";
import { Header } from "../../components/Header";
import { TextInput } from "../../components/TextInput";
import { Button, IconButton } from "../../components/Button";
import { CategoryIF, SubcategoryIF } from "../../interfaces/settingsInterface";
import { neutral, primaryColor } from "../../components/token";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCategory,
  reset,
  addSubCategory,
} from "../../redux/settingsActionsReducer";
import { RootState } from "../../redux/store";
import { Body } from "../../components/Text";
import { Check, Delete, Edit } from "../../assets/Icon";
import List from "../../components/List";

interface Props {
  catId?: string;
}

const SubCategories: FC<Props> = ({ catId }) => {
  const dispatch = useDispatch();

  //this category
  const { categoryDetails } = useSelector((state: RootState) => state.settings);

  const [subCategories, setSubCategories] = useState<SubcategoryIF[]>(
    categoryDetails.data.subCategory!
  );

  //edit existing subcategory

  const [currentEditMode, setCurrentEditMode] = useState(10000);

  const handleSubEdit = (idx: number) => {
    setCurrentEditMode(idx);
  };

  const handleSubInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const { name, value } = e.target;

    //find current item
    let newSubCategories = [...subCategories];
    let itemIndex = newSubCategories.findIndex((item) => item._id === id);
    let thisItem = newSubCategories[itemIndex];

    let newItem = { ...thisItem };
    newItem[name as keyof CategoryIF] = value;

    newSubCategories[itemIndex] = newItem;
    setSubCategories(newSubCategories);
  };

  const handleSubSubmit = (id: string) => {
    setCurrentEditMode(10000);
    dispatch(
      updateCategory({
        id: catId!,
        category: {
          name: categoryDetails.data.name,
          value: categoryDetails.data.value,
          subCategory: subCategories,
        },
      })
    );
  };

  //add new category
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
    dispatch(addSubCategory({ id: catId!, sub: newSubcategory }));
  };

  //actions after submitting data
  const { subAdded, categoryUpdated } = useSelector(
    (state: RootState) => state.settingsActions
  );

  const clear = () => {
    setNewSubcategory({
      name: "",
      value: "",
    });
  };

  useEffect(() => {
    if (subAdded.status === 200) {
      alert("Subcategory successfully added!");
      dispatch(reset());
      clear();
    } else if (categoryUpdated.status === 200) {
      alert("Category successfully updated!");
      dispatch(reset());
    } else if (subAdded.status !== 200 && subAdded.status !== 0) {
      alert("error");
    }
  }, [dispatch, subAdded.status, subAdded.categoryDetails._id]);

  return (
    <>
      <Header title="Subcategories" small margin="0 0 1rem 0" />
      {subCategories &&
        subCategories.map((item, idx) =>
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
              <Flex className="flexOne">
                <IconButton
                  handleClick={() => handleSubSubmit(item._id!)}
                  bgColor={primaryColor.gold}
                >
                  <Check
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
                <IconButton handleClick={() => handleSubEdit(idx)}>
                  <Edit
                    width={18}
                    height={18}
                    color={neutral[600]}
                    stroke={2}
                  />
                </IconButton>
                <IconButton>
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
    </>
  );
};

export default SubCategories;

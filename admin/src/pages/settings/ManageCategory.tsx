import React, { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

//comp
import { Div, Flex } from "../../components/containers/Div";
import { Section } from "../../components/containers/Section";
import { Header } from "../../components/Header";
import Breadcrumbs from "../../components/Breadcrumbs";
import { TextInput } from "../../components/TextInput";

//others
import {
  CategoryIF,
  CategoryWithSubCategoryIF,
} from "../../interfaces/settingsInterface";

//redux
import { getACategory } from "../../redux/settingsReducer";
import { RootState } from "../../redux/store";
import { IconButton } from "../../components/Button";
import { neutral } from "../../components/token";
import ManageSubcategories from "./components/ManageSubcategories";
import TextBlock from "../../components/TextBlock";
import { Edit } from "../../assets/Icon";

const CategoryDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<CategoryWithSubCategoryIF>({
    _id: "",
    name: "",
    value: "",
    subCategory: [],
  });

  useEffect(() => {
    dispatch(getACategory(id!));
  }, [dispatch]);

  const { data } = useSelector(
    (state: RootState) => state.settings.categoryDetails
  );

  useEffect(() => {
    if (data) setCategory(data);
  }, [data]);

  const handleSubmit = () => {
    console.log(category);
  };

  return (
    <Div>
      <Header title="Manage Category" textAlign="left" />
      <Breadcrumbs
        category1={{ title: "Settings" }}
        category2={{ title: "Categories", link: "/settings/categories" }}
        category3={{ title: data.name! }}
      />
      <Section bgColor="#fff" gap=".875rem" padding="1.25rem" margin="1rem 0">
        {/* <Header title="Main Category" small margin="0 0 1rem 0" /> */}
        <Flex>
          <TextBlock title="Name" value={data.name} className="flexTwo" />
          <TextBlock title="Value" value={data.value} className="flexTwo" />
          <div className="flexOne">
            <IconButton>
              <Edit width={18} height={18} color={neutral[600]} stroke={2} />
            </IconButton>
          </div>
        </Flex>
      </Section>

      {/* <ManageSubcategories catId={id} /> */}
      <ManageSubcategories />
    </Div>
  );
};

export default CategoryDetails;

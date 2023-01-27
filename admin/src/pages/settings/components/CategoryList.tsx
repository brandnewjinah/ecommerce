import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FlexTable from "../../../components/FlexTable";
import { Header } from "../../../components/Header";
import { getCategories } from "../../../redux/settingsReducer";
import { RootState } from "../../../redux/store";

const CategoryList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories(""));
  }, [dispatch]);

  const { categories } = useSelector((state: RootState) => state.settings);

  const tableKey = [
    {
      name: "Category ID",
      width: "flexOne",
    },
    {
      name: "Category Name",
      width: "flexOne",
    },
    {
      name: "Category Value",
      width: "flexOne",
    },
    {
      name: "Subcategory Count",
      width: "flexOne",
    },
  ];

  const tableData =
    categories &&
    categories.data.map((item) => {
      return [
        { value: item._id, width: "flexOne" },
        { value: item.name, width: "flexOne" },
        { value: item.value, width: "flexOne" },
        {
          value: item.subCategory && item.subCategory.length,
          width: "flexOne",
        },
      ];
    });

  return (
    <>
      <Header small title="Category List" margin="0 0 1.75rem 0" />
      <FlexTable keys={tableKey} data={tableData} param="/settings/category" />
    </>
  );
};

export default CategoryList;

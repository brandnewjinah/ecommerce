import React, { useEffect } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import FlexTable from "../../../components/FlexTable";
import { Header } from "../../../components/Header";
import { getBrands } from "../../../redux/settingsReducer";
import { RootState } from "../../../redux/store";

const BrandsList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrands(""));
  }, [dispatch]);

  const { brands } = useSelector((state: RootState) => state.settings);

  const tableKey = [
    {
      name: "Brand ID",
      width: "flexOne",
    },
    {
      name: "Brand Name",
      width: "flexOne",
    },
    {
      name: "Brand Value",
      width: "flexOne",
    },
  ];

  const tableData =
    brands &&
    brands.data.map((item) => {
      return [
        { value: item._id, width: "flexOne" },
        { value: item.name, width: "flexOne" },
        { value: item.value, width: "flexOne" },
      ];
    });

  return (
    <>
      <Header small title="Brand List" margin="0 0 1.75rem 0" />
      <FlexTable keys={tableKey} data={tableData} param="/settings/brand" />
    </>
  );
};

export default BrandsList;

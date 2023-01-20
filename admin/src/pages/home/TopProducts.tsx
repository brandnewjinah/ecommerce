import React from "react";

//comp
import FlexTable from "../../components/FlexTable";

//test data
import { orderData } from "../../data/testData";

const TopProducts = () => {
  const tableKey = [
    {
      name: "Product ID",
      width: "flexOne",
    },
    {
      name: "Name",
      width: "flexTwo",
    },
    {
      name: "Brand",
      width: "flexOne",
    },
    {
      name: "Price",
      width: "flexOne",
    },
    {
      name: "Sold",
      width: "flexOne",
    },
  ];

  const tableData =
    orderData &&
    orderData.map((item) => {
      return [
        { value: `...${item._id.slice(-7)}`, width: "flexOne" },
        { value: item.createdAt, width: "flexTwo" },
        { value: `...${item.user.slice(-7)}`, width: "flexOne" },
        { value: item.orderItems.length, width: "flexOne" },
        { value: item.total, width: "flexOne" },
      ];
    });

  return <FlexTable keys={tableKey} data={tableData} />;
};

export default TopProducts;

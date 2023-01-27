import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

//comp
import Breadcrumbs from "../../components/Breadcrumbs";
import { Div, Flex } from "../../components/containers/Div";
import { Header } from "../../components/Header";

//others
import { BrandIF } from "../../interfaces/settingsInterface";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getABrand } from "../../redux/settingsReducer";
import { RootState } from "../../redux/store";
import { Section } from "../../components/containers/Section";
import TextBlock from "../../components/TextBlock";
import { IconButton } from "../../components/Button";
import { Edit } from "../../assets/Icon";
import { neutral } from "../../components/token";

const ManageBrand = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  const [brand, setBrand] = useState<BrandIF>({
    _id: "",
    name: "",
    value: "",
    description: "",
  });

  useEffect(() => {
    dispatch(getABrand(id!));
  }, [dispatch]);

  const { data } = useSelector(
    (state: RootState) => state.settings.brandDetails
  );

  useEffect(() => {
    if (data) setBrand(data);
  }, [data]);

  return (
    <Div>
      <Header title="Manage Brand" textAlign="left" />
      <Breadcrumbs
        category1={{ title: "Settings" }}
        category2={{ title: "Brands", link: "/settings/brands" }}
      />
      <Section bgColor="#fff" gap=".875rem" padding="1.25rem" margin="1rem 0">
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
      <Section bgColor="#fff" gap=".875rem" padding="1.25rem" margin="1rem 0">
        <TextBlock title="Description" />
      </Section>
    </Div>
  );
};

export default ManageBrand;

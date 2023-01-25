import React, { ChangeEvent } from "react";
import { CategoryWithSubCategoryIF } from "./settingsInterface";

export interface SelectProps {
  options?: CategoryWithSubCategoryIF[];
  selected?: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  fullWidth?: boolean;
}

export interface SelectOptionProps {
  _id?: number;
  value: string;
  name: string;
  subcategory?: SelectOptionSubProps[];
}

export interface SelectOptionSubProps {
  _id?: number;
  value: string;
  name: string;
}

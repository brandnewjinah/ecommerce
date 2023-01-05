import React, { ChangeEvent } from "react";

export interface SelectProps {
  options?: SelectOptionProps[];
  selected?: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  fullWidth?: boolean;
}

export interface SelectOptionProps {
  id: number;
  value: string;
  label: string;
  subcategory?: SelectOptionSubProps[];
}

export interface SelectOptionSubProps {
  id: number;
  value: string;
  label: string;
}

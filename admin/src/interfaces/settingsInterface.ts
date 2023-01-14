export interface SubcategoryIF {
  _id?: string;
  value?: string;
  label?: string;
}

export interface CategoryIF {
  _id?: string;
  name?: string;
  value?: string;
}

export interface CategoryWithSubCategoryIF extends CategoryIF {
  subCategory?: SubcategoryIF[];
}

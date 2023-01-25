export interface SubcategoryIF {
  _id?: string;
  value?: string;
  name?: string;
}

export interface CategoryIF {
  _id?: string;
  name?: string;
  value?: string;
}

export interface CategoryWithSubCategoryIF extends CategoryIF {
  subCategory?: SubcategoryIF[];
}

export interface BrandIF {
  _id?: string;
  name?: string;
  value?: string;
  description?: string;
}

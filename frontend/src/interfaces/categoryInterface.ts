export interface SubcategoryIF {
  _id?: string;
  id: number;
  value: string;
  label: string;
}

export interface CategoryIF {
  _id?: string;
  id: number;
  value: string;
  label: string;
  subcategory?: SubcategoryIF[];
}

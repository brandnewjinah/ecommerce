export interface SubcategoryIF {
  id: number;
  value: string;
  label: string;
}

export interface CategoryIF {
  id: number;
  value: string;
  label: string;
  subcategory?: SubcategoryIF[];
}

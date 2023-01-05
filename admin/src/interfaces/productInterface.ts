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

export interface ProductIF {
  _id?: string;
  name?: string;
  brand?: string;
  sku?: string;
  price?: string;
  img?: string;
  size?: string;
  description?: string;
}

export interface ProductWithCategoryIF extends ProductIF {
  category1?: CategoryIF;
  category2?: SubcategoryIF;
}

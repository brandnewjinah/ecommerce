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

export interface Product {
  _id?: string;
  name: string;
  brand: string;
  sku: string;
  price: string;
  category1: CategoryIF;
  category2: SubcategoryIF;
  img: string;
  size: string;
}

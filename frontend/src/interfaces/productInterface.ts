import { CategoryIF, SubcategoryIF } from "./categoryInterface";

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

export interface Products extends Array<Product> {}

export interface GetSimilar {
  productId?: string;
  categoryId?: number;
}

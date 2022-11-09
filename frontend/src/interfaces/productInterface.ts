export interface Product {
  _id?: string;
  name: string;
  brand: string;
  sku: string;
  price: string;
  category1: Category1;
  category2: Category2;
  img: string;
  size: string;
}

export interface Category2 {
  _id?: string;
  id?: number;
  value?: string;
  label?: string;
}

export interface Category1 extends Category2 {
  subcategory?: Category2[];
}

export interface Products extends Array<Product> {}

export interface GetSimilar {
  productId?: string;
  categoryId?: number;
}

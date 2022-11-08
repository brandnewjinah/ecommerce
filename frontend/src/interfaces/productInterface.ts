export interface Product {
  _id?: string;
  name: string;
  brand: string;
  sku: string;
  price: string;
  category1: Object;
  category2: Object;
  img: string;
  size: string;
}

export interface Products extends Array<Product> {}

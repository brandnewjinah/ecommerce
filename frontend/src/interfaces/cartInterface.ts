import { StringLiteral } from "typescript";

export interface AddToCart {
  productId?: string;
  qty?: number;
}

export interface CartProductInfo {
  name?: string;
  brand?: string;
  price?: any;
  img?: string;
  productId?: string;
  qty?: number;
}

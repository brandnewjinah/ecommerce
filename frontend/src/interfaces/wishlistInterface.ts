import { Product } from "./productInterface";

export interface WishlistProduct {
  _id?: string;
  product: Product;
}

export interface Wishlist extends Array<WishlistProduct> {}

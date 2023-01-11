export interface AddToCart {
  productId?: string;
  qty?: number;
}

export interface CartProductInfo {
  name?: string;
  brand?: string;
  qty?: number;
  price?: any;
  img?: string;
  productId?: string;
}

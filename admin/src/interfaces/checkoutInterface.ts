import { ProductBasicIF } from "./productInterface";

export interface ShippingIF {
  fullName?: string;
  streetAddress?: string;
  streetAddress2?: string;
  city?: string;
  state?: string;
  zip?: string;
  phone?: string;
}

export interface ShippingErrors {
  fullName?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
}

export interface DeliveryIF {
  shipping?: string;
}

export interface PaymentIF {
  fullName?: string;
  cardNumber?: string;
  expiration?: string;
  cvc?: string;
}

export interface OrderIF {
  shipping: ShippingIF;
  delivery: DeliveryIF;
  payment: PaymentIF;
  orderItems: ProductBasicIF[];
  total: number;
}

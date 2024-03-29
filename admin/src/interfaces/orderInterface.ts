// import { ShippingIF, PaymentIF, DeliveryIF } from "./checkoutInterface";
import { ShippingIF, PaymentIF, DeliveryIF } from "./checkoutInterface";
import { CartProductInfo } from "./cartInterface";

interface UserIF {
  _id?: string;
  name?: string;
  email?: string;
}

export interface OrderIF {
  _id: string;
  orderStatus: string;
  shipping: ShippingIF;
  payment: PaymentIF;
  delivery: DeliveryIF;
  orderItems: CartProductInfo[];
  total: number;
  createdAt: string;
  user?: UserIF;
}

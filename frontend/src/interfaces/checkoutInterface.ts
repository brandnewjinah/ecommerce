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

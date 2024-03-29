import { BrandIF } from "./settingsInterface";

export interface ProductBasicIF {
  _id?: string;
  name?: string;
  brand: BrandIF;
  image?: string;
  size?: string;
  description?: string;
}

export interface SubcategoryIF {
  _id?: string;
  value: string;
  name: string;
}

export interface CategoryIF {
  _id?: string;
  value: string;
  name: string;
  subCategory?: SubcategoryIF[];
}

export interface PriceIF {
  current?: string;
  previous?: string;
  currency?: string;
}

export interface ProductFullIF extends ProductBasicIF {
  price?: PriceIF;
  category1?: CategoryIF;
  category2?: SubcategoryIF;
}

export interface ProductErrorIF {
  _id?: string;
  name?: string;
  brand?: string;
  price?: string;
  category1?: string;
}

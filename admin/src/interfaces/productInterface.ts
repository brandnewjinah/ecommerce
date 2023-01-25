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

export interface ProductIF {
  _id?: string;
  name?: string;
  brand?: string;
  sku?: string;
  price?: string;
  prevPrice?: string;
  img?: string;
  size?: string;
  description?: string;
}

export interface ProductWithCategoryIF extends ProductIF {
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

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicRequest } from "../api";
import { Status } from "../interfaces/baseInterface";
import { Product, Products, GetSimilar } from "../interfaces/productInterface";

export interface ProductDetailsResponse extends Status {
  product: Product;
}

export interface SimilarProductsResponse extends Status {
  products: Products;
}

export interface State {
  isLoading: boolean;
  productDetails: ProductDetailsResponse;
  similarProducts: SimilarProductsResponse;
}

const initialState: State = {
  isLoading: false,
  productDetails: {
    status: 0,
    message: "",
    product: {
      _id: "",
      name: "",
      brand: "",
      sku: "",
      price: "",
      category1: {},
      category2: {},
      img: "",
      size: "",
    },
  },
  similarProducts: {
    status: 0,
    message: "",
    products: [],
  },
};

export const getProductDetails = createAsyncThunk<
  ProductDetailsResponse,
  string,
  {
    rejectValue: Status;
  }
>(
  "productDetails/getProductDetails",
  async (productId: string, { rejectWithValue }) => {
    try {
      const res = await publicRequest.get(`/products/${productId}`);
      return {
        status: res.status,
        message: res.statusText,
        product: res.data,
      } as ProductDetailsResponse;
    } catch (error: any) {
      return rejectWithValue({
        status: error.response.status,
        message: error.response.data.message,
      });
    }
  }
);

export const getSimilarProducts = createAsyncThunk<
  SimilarProductsResponse,
  GetSimilar,
  {
    rejectValue: Status;
  }
>(
  "productDetails/getSimilarProducts",
  async (obj: GetSimilar, { rejectWithValue }) => {
    try {
      const res = await publicRequest.get(
        `/products/similar/${obj.productId}?similar=${obj.categoryId}`
      );
      return {
        status: res.status,
        message: res.statusText,
        products: res.data,
      } as SimilarProductsResponse;
    } catch (error: any) {
      return rejectWithValue({
        status: error.response.status,
        message: error.response.data.message,
      });
    }
  }
);

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProductDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productDetails.status = action.payload.status;
      state.productDetails.message = action.payload.message;
      state.productDetails.product = action.payload.product;
    });
    builder.addCase(getProductDetails.rejected, (state, action) => {
      state.isLoading = false;
      state.productDetails.status = action.payload!.status;
      state.productDetails.message = action.payload!.message;
      state.productDetails.product = {
        _id: "",
        name: "",
        brand: "",
        sku: "",
        price: "",
        img: "",
        size: "",
        category1: {},
        category2: {},
      };
    });
    builder.addCase(getSimilarProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSimilarProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.similarProducts.status = action.payload.status;
      state.similarProducts.message = action.payload.message;
      state.similarProducts.products = action.payload.products;
    });
    builder.addCase(getSimilarProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.similarProducts.status = action.payload!.status;
      state.similarProducts.message = action.payload!.message;
      state.similarProducts.products = [];
    });
  },
});

export default productDetailsSlice.reducer;

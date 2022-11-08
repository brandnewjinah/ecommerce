import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicRequest } from "../api";
import { Status } from "../interfaces/baseInterface";
import { Product } from "../interfaces/productInterface";

export interface ProductDetailsResponse extends Status {
  productDetails: Product;
}

export interface State extends ProductDetailsResponse {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false,
  status: 0,
  message: "",
  productDetails: {
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
};

export const getProductDetails = createAsyncThunk<
  ProductDetailsResponse,
  string,
  {
    rejectValue: Status;
  }
>(
  "productDetails/getProductDetails",
  async (beanId: string, { rejectWithValue }) => {
    try {
      const res = await publicRequest.get(`/products/${beanId}`);
      return {
        status: res.status,
        productDetails: res.data,
        message: res.statusText,
      } as ProductDetailsResponse;
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
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.productDetails = action.payload.productDetails;
    });
    builder.addCase(getProductDetails.rejected, (state, action) => {
      state.isLoading = false;
      state.status = action.payload!.status;
      state.message = action.payload!.message;
      state.productDetails = {
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
  },
});

export default productDetailsSlice.reducer;

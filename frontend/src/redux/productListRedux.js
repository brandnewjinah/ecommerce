import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicRequest } from "../api";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (obj) => {
    try {
      const res = await publicRequest.get(
        `/products?category=${obj.category}&page=${obj.page}`
      );
      return {
        isLoading: false,
        status: res.status,
        message: res.statusText,
        products: res.data,
      };
    } catch (error) {
      return {
        status: error.response.status,
        message: error.response.data.message,
      };
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    isLoading: false,
    products: [],
    status: 0,
    message: "",
  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.products = action.payload.products;
    },
    [getProducts.rejected]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.status;
      state.message = action.payload.message;
    },
  },
});

export default productsSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (value) => {
    try {
      const { data } = await api.publicRequest.get(
        `/products?category=${value.category}&page=${value.page}`
      );
      return data;
    } catch (error) {
      return error;
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    isLoading: false,
  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    },
    [getProducts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default productsSlice.reducer;

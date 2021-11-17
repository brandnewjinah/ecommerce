import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (category) => {
    try {
      const { data } = await api.getProducts(category);
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const getNewProducts = createAsyncThunk(
  "products/getNewProducts",
  async () => {
    try {
      const { data } = await api.getNewProducts();
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
    loading: true,
  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.loading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    [getProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getNewProducts.pending]: (state) => {
      state.loading = true;
    },
    [getNewProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    [getNewProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// export const { getProdutsRequest, getProdutsSuccess, getProdutsFailure } =
//   productsSlice.actions;
export default productsSlice.reducer;

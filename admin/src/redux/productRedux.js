import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as api from "../api";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (value) => {
    try {
      const { data } = await api.getProducts(value.category, value.page);
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product) => {
    try {
      const { data } = await api.addProduct(product);
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (obj) => {
    try {
      const { data } = await api.updateProduct(obj.id, obj.updatedProduct);
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    try {
      const { data } = await api.deleteProduct(id);
      console.log(data);
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
    [addProduct.pending]: (state) => {
      state.loading = true;
    },
    [addProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    [addProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// export const { getProdutsRequest, getProdutsSuccess, getProdutsFailure } =
//   productsSlice.actions;
export default productsSlice.reducer;

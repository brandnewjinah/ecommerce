import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as api from "../api";

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product) => {
    try {
      const result = await api.adminRequest.post(`/products`, product);
      return result;
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
      const result = await api.adminRequest.delete(`/products/${id}`);
      return result;
    } catch (error) {
      return error;
    }
  }
);

export const deleteProducts = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    try {
      const result = await api.adminRequest.patch(`/products`, id);
      return result;
    } catch (error) {
      return error;
    }
  }
);

const productDetailSlice = createSlice({
  name: "productDetails",
  initialState: {
    productAdded: false,
    productUpdated: false,
    productDeleted: false,
    productsDeleted: false,
    isLoading: false,
    isError: false,
  },
  reducers: {
    reset: (state) => {
      state.productAdded = false;
      state.productUpdated = false;
      state.productDeleted = false;
      state.productsDeleted = false;
      state.isLoading = false;
      state.isError = false;
    },
  },
  extraReducers: {
    [addProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [addProduct.fulfilled]: (state) => {
      state.isLoading = false;
      state.productAdded = true;
    },
    [addProduct.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
      state.productAdded = false;
    },
    [deleteProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteProduct.fulfilled]: (state) => {
      state.isLoading = false;
      state.productDeleted = true;
    },
    [deleteProduct.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
      state.productDeleted = false;
    },
    [deleteProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteProducts.fulfilled]: (state) => {
      state.isLoading = false;
      state.productsDeleted = true;
    },
    [deleteProducts.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
      state.productsDeleted = false;
    },
  },
});

export const { reset } = productDetailSlice.actions;
export default productDetailSlice.reducer;

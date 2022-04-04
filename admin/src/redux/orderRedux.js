import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getAllOrders = createAsyncThunk(
  "orders/getAllOrders",
  async (page) => {
    try {
      const { data } = await api.adminRequest.get(`/orders?page=${page}`);
      return data;
    } catch (error) {
      return error;
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    isLoading: false,
    isError: false,
  },
  extraReducers: {
    [getAllOrders.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllOrders.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    },
    [getAllOrders.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export default orderSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getAllOrders = createAsyncThunk(
  "orders/getAllOrders",
  async (page) => {
    try {
      const { data } = await api.getAllOrders(page);
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
    loading: false,
    error: false,
  },
  extraReducers: {
    [getAllOrders.pending]: (state) => {
      state.loading = true;
    },
    [getAllOrders.fulfilled]: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    [getAllOrders.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export default orderSlice.reducer;

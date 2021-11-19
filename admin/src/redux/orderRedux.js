import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getAllOrders = createAsyncThunk(
  "orders/getAllOrders",
  async () => {
    try {
      const { data } = await api.getAllOrders();
      return data;
    } catch (error) {
      return error;
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    loading: true,
  },
  extraReducers: {
    [getAllOrders.pending]: (state) => {
      state.loading = true;
    },
    [getAllOrders.fulfilled]: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    [getAllOrders.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default orderSlice.reducer;

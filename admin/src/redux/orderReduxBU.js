import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getAllOrders = createAsyncThunk(
  "orders/getAllOrders",
  async (value) => {
    try {
      const { data } = await api.getAllOrders(value.page);
      return data;
    } catch (error) {
      return error;
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orderdata: [],
    loading: true,
  },
  extraReducers: {
    [getAllOrders.pending]: (state) => {
      state.loading = true;
    },
    [getAllOrders.fulfilled]: (state, action) => {
      state.loading = false;
      state.orderdata = action.payload;
    },
    [getAllOrders.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default orderSlice.reducer;

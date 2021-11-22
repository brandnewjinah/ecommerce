import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateRequest } from "../api";

export const getOrderDetail = createAsyncThunk(
  "orderDetail/getOrderDetail",
  async (id) => {
    try {
      const { data } = await privateRequest.get(`/orders/${id}`);
      return data;
    } catch (error) {
      return error;
    }
  }
);

const orderDetailSlice = createSlice({
  name: "orderDetail",
  initialState: {
    order: {},
    loading: true,
  },
  extraReducers: {
    [getOrderDetail.pending]: (state) => {
      state.loading = true;
    },
    [getOrderDetail.fulfilled]: (state, action) => {
      state.loading = false;
      state.order = action.payload;
    },
    [getOrderDetail.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default orderDetailSlice.reducer;
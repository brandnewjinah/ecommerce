import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getOrderDetail = createAsyncThunk(
  "orderDetail/getOrderDetail",
  async (obj) => {
    try {
      const { data } = await api.adminRequest.get(
        `/orders/${obj.userId}/${obj.id}`
      );
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

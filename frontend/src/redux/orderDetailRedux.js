import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getOrderDetail = createAsyncThunk(
  "orderDetails/getOrderDetail",
  async (id) => {
    try {
      const { data } = await api.privateRequest.get(`/orders/${id}`);
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const getUserOrders = createAsyncThunk(
  "orderDetails/getUserOrders",
  async (userId) => {
    try {
      const { data } = await api.privateRequest.get(`/orders/user/${userId}`);
      return data;
    } catch (error) {
      return error;
    }
  }
);

const orderDetailSlice = createSlice({
  name: "orderDetails",
  initialState: {
    loading: true,
    orders: [],
    order: {},
  },
  reducers: {
    clearOrders: (state) => {
      state.orders = [];
      state.order = {};
    },
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
    [getUserOrders.pending]: (state) => {
      state.loading = true;
    },
    [getUserOrders.fulfilled]: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    [getUserOrders.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { clearOrders } = orderDetailSlice.actions;

export default orderDetailSlice.reducer;

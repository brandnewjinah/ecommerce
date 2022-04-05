import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (order) => {
    try {
      const { data } = await api.privateRequest.post(`/orders`, order);
      return data;
    } catch (error) {
      return error;
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    shipping: {},
    delivery: {},
    payment: {},
    isLoading: false,
    isSuccess: false,
  },
  reducers: {
    saveShipping: (state, action) => {
      state.shipping = action.payload;
    },
    saveDelivery: (state, action) => {
      state.delivery = action.payload;
    },
    savePayment: (state, action) => {
      state.payment = action.payload;
    },
    resetOrder: (state) => {
      state.shipping = {};
      state.delivery = {};
      state.payment = {};
      state.isLoading = false;
      state.isSuccess = false;
    },
  },
  extraReducers: {
    [placeOrder.pending]: (state) => {
      state.isLoading = true;
    },
    [placeOrder.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.orderDetail = action.payload.order;
    },
    [placeOrder.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { resetOrder, saveShipping, saveDelivery, savePayment } =
  orderSlice.actions;
export default orderSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import {
  DeliveryIF,
  PaymentIF,
  ShippingIF,
} from "../interfaces/checkoutInterface";

interface State {
  shipping: ShippingIF;
  delivery: DeliveryIF;
  payment: PaymentIF;
}

const initialState: State = {
  shipping: {},
  delivery: {},
  payment: {},
};

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
  initialState,
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
  },
  extraReducers: {},
});

export const { saveShipping, saveDelivery, savePayment } = orderSlice.actions;
export default orderSlice.reducer;

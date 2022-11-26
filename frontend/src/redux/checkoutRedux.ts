import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { ShippingIF } from "../interfaces/checkoutInterface";

interface State {
  shipping: ShippingIF;
}

const initialState: State = {
  shipping: {},
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
  },
  extraReducers: {},
});

export const { saveShipping } = orderSlice.actions;
export default orderSlice.reducer;
